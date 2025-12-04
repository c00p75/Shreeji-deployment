import { Controller, Put, Param, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';

// TODO: Add proper authentication guards
// @UseGuards(JwtAuthGuard)

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Put(':orderId/verify-payment')
  async verifyPayment(
    @Param('orderId') orderId: number,
    @Body() body: { verified: boolean },
  ) {
    if (body.verified) {
      await this.ordersService.markOrderPaid(orderId);
      return { success: true, message: 'Order payment verified and order marked as paid' };
    }
    return { success: false, message: 'Payment verification failed' };
  }

  @Put(':orderId/cancel')
  async cancelOrder(
    @Param('orderId') orderId: number,
    @Body() body: { reason?: string },
  ) {
    await this.ordersService.cancelOrder(orderId, body.reason);
    return { success: true, message: 'Order cancelled' };
  }
}

