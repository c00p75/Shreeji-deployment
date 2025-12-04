import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrdersService } from '../orders/orders.service';
import { PaymentsService } from '../payments/payments.service';

@Injectable()
export class PaymentDeadlineJob {
  private readonly logger = new Logger(PaymentDeadlineJob.name);

  constructor(
    private readonly ordersService: OrdersService,
    private readonly paymentsService: PaymentsService,
  ) {}

  // Run every hour to check for expired payment deadlines
  @Cron(CronExpression.EVERY_HOUR)
  async handleExpiredPaymentDeadlines() {
    this.logger.log('Checking for orders with expired payment deadlines...');

    try {
      const expiredOrders = await this.ordersService.getOrdersWithExpiredPaymentDeadline();

      for (const order of expiredOrders) {
        this.logger.warn(`Cancelling order ${order.id} - payment deadline expired`);

        // Cancel the order
        await this.ordersService.cancelOrder(order.id, 'Payment deadline expired - no payment received');

        // Update payment status
        const payment = await this.paymentsService.getPaymentByOrderId(order.id);
        if (payment) {
          await this.paymentsService.updatePaymentStatus(payment.id, 'cancelled');
        }

        this.logger.log(`Order ${order.id} cancelled due to expired payment deadline`);
      }

      if (expiredOrders.length > 0) {
        this.logger.log(`Cancelled ${expiredOrders.length} order(s) with expired payment deadlines`);
      }
    } catch (error) {
      this.logger.error('Error processing expired payment deadlines', error);
    }
  }
}

