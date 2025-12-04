import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { BankDetailsConfig } from '../config/bank-details.config';

// TODO: Add proper authentication guards
// @UseGuards(JwtAuthGuard)

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly bankDetailsConfig: BankDetailsConfig,
  ) {}

  @Get('bank-details')
  async getBankDetails() {
    const details = await this.bankDetailsConfig.getBankDetails();
    const deadlineHours = await this.bankDetailsConfig.getPaymentDeadlineHours();
    return {
      ...details,
      deadlineHours,
    };
  }

  @Get('order/:orderId')
  async getPaymentByOrderId(@Param('orderId') orderId: number) {
    const payment = await this.paymentsService.getPaymentByOrderId(orderId);
    if (!payment) {
      return { error: 'Payment not found' };
    }
    return payment;
  }

  @Put('verify/:paymentId')
  async verifyPayment(
    @Param('paymentId') paymentId: number,
    @Body() body: { status: string; paymentProofUrl?: string },
  ) {
    await this.paymentsService.updatePaymentStatus(paymentId, body.status, body.paymentProofUrl);
    return { success: true, message: 'Payment status updated' };
  }
}

