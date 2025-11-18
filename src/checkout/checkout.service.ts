import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CartService } from '../cart/cart.service';
import { CustomersService } from '../customers/customers.service';
import { OrdersService } from '../orders/orders.service';
import { PaymentsService } from '../payments/payments.service';
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

    const paymentResult = await this.paymentGateway.createIntent({
      amount: totals.totalAmount,
      currency: totals.currency,
      paymentMethod: payload.paymentMethod as any,
      metadata: {
        orderNumber,
      },
    });

    await this.paymentsService.recordPayment({
      orderId: order.id,
      customerId,
      amount: totals.totalAmount,
      currency: totals.currency,
      paymentMethod: payload.paymentMethod,
      status: paymentResult.status === 'approved' ? 'completed' : 'failed',
      transactionId: paymentResult.transactionId,
      gatewayResponse: paymentResult.raw,
    });

    if (paymentResult.status === 'approved') {
      await this.ordersService.markOrderPaid(order.id);
    }

    this.cartService.clearCart(payload.cartId);

    return {
      orderNumber,
      orderId: order.id,
      paymentStatus: paymentResult.status,
      totals,
    };
  }
}

