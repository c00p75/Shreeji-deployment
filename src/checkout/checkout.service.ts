import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CartService } from '../cart/cart.service';
import { CustomersService } from '../customers/customers.service';
import { OrdersService } from '../orders/orders.service';
import { PaymentsService } from '../payments/payments.service';
import { EmailService } from '../email/email.service';
import { BankDetailsConfig } from '../config/bank-details.config';
import { CheckoutDto } from './dto/checkout.dto';
import { generateOrderNumber } from '../common/utils/order-number.util';
import { PAYMENT_GATEWAY } from '../payments/payment.constants';
import type { PaymentGateway } from '../payments/payment-gateway.interface';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly cartService: CartService,
    private readonly customersService: CustomersService,
    private readonly ordersService: OrdersService,
    private readonly paymentsService: PaymentsService,
    private readonly emailService: EmailService,
    private readonly bankDetailsConfig: BankDetailsConfig,
    @Inject(PAYMENT_GATEWAY) private readonly paymentGateway: PaymentGateway,
  ) {}

  async processCheckout(payload: CheckoutDto) {
    const cart = this.cartService.getCart(payload.cartId);
    if (!cart.items.length) {
      throw new BadRequestException('Cart is empty');
    }

    const totals = {
      subtotal: cart.subtotal,
      taxAmount: cart.taxTotal,
      shippingAmount: 0,
      discountAmount: 0,
      totalAmount: cart.total,
      currency: cart.currency,
    };

    const customerId = await this.customersService.ensureCustomer(payload.customer);
    const shippingAddressId = await this.customersService.createAddress(customerId, {
      type: 'shipping',
      ...payload.shippingAddress,
    });
    const billingAddressId = await this.customersService.createAddress(customerId, {
      type: payload.billingAddress ? 'billing' : 'billing',
      ...(payload.billingAddress ?? payload.shippingAddress),
    });

    const orderNumber = generateOrderNumber();
    const order = await this.ordersService.createOrder({
      orderNumber,
      customerId,
      shippingAddressId,
      billingAddressId,
      notes: payload.notes,
      totals,
    });

    await this.ordersService.addOrderItems(order.id, cart.items);

    // For cash on pickup, update order with pickup details and send notification
    if (payload.paymentMethod === 'cash_on_pickup' && payload.pickupDetails) {
      await this.ordersService.updateOrderWithPickupDetails(order.id, payload.pickupDetails);

      // Prepare order items for email
      const orderItems = cart.items.map(item => ({
        productName: item.productSnapshot.name,
        quantity: item.quantity,
        price: item.unitPrice,
      }));

      // Send email notification to team
      await this.emailService.sendCashOnPickupNotification({
        orderNumber,
        orderId: order.id,
        customerName: `${payload.customer.firstName} ${payload.customer.lastName}`,
        customerEmail: payload.customer.email,
        customerPhone: payload.customer.phone,
        totalAmount: totals.totalAmount,
        currency: totals.currency,
        pickupDetails: payload.pickupDetails,
        orderItems,
      });
    }

    const paymentResult = await this.paymentGateway.createIntent({
      amount: totals.totalAmount,
      currency: totals.currency,
      paymentMethod: payload.paymentMethod as any,
      metadata: {
        orderNumber,
        orderId: order.id,
        customerEmail: payload.customer.email,
        customerName: `${payload.customer.firstName} ${payload.customer.lastName}`,
      },
    });

    // For bank transfers, set status to 'pending' instead of 'failed'
    const paymentStatus = paymentResult.status === 'approved' 
      ? 'completed' 
      : paymentResult.status === 'pending'
      ? 'pending'
      : 'failed';

    await this.paymentsService.recordPayment({
      orderId: order.id,
      customerId,
      amount: totals.totalAmount,
      currency: totals.currency,
      paymentMethod: payload.paymentMethod,
      status: paymentStatus,
      transactionId: paymentResult.transactionId,
      gatewayResponse: paymentResult.raw,
    });

    // If payment is approved, mark order as paid
    if (paymentResult.status === 'approved') {
      await this.ordersService.markOrderPaid(order.id);
    }

    // For bank transfers, send email with instructions
    if (payload.paymentMethod === 'bank_transfer' && paymentResult.status === 'pending') {
      const bankDetails = this.bankDetailsConfig.getBankDetails();
      const deadlineHours = this.bankDetailsConfig.getPaymentDeadlineHours();
      
      // Set payment deadline on order
      await this.ordersService.setPaymentDeadline(order.id, deadlineHours);

      // Send email with bank transfer instructions
      await this.emailService.sendBankTransferInstructions({
        customerName: `${payload.customer.firstName} ${payload.customer.lastName}`,
        customerEmail: payload.customer.email,
        orderNumber,
        orderId: order.id,
        amount: totals.totalAmount,
        currency: totals.currency,
        bankDetails,
        deadlineHours,
      });
    }

    this.cartService.clearCart(payload.cartId);

    return {
      orderNumber,
      orderId: order.id,
      paymentStatus: paymentResult.status,
      totals,
      redirectUrl: paymentResult.redirectUrl,
      requiresAction: paymentResult.requiresAction,
    };
  }
}

