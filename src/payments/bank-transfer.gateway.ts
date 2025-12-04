import { Injectable } from '@nestjs/common';
import { PaymentGateway, PaymentIntentRequest, PaymentIntentResponse } from './payment-gateway.interface';

@Injectable()
export class BankTransferGateway implements PaymentGateway {
  async createIntent(request: PaymentIntentRequest): Promise<PaymentIntentResponse> {
    // Bank transfers are always pending - they require manual verification
    return {
      status: 'pending',
      transactionId: `BT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      raw: {
        paymentMethod: 'bank_transfer',
        amount: request.amount,
        currency: request.currency,
        orderNumber: request.metadata?.orderNumber,
      },
    };
  }
}

