export interface PaymentIntentRequest {
  amount: number;
  currency: string;
  paymentMethod: string;
  metadata?: Record<string, any>;
}

export interface PaymentIntentResponse {
  status: 'approved' | 'pending' | 'failed';
  transactionId?: string;
  raw?: any;
  redirectUrl?: string;
  requiresAction?: boolean;
}

export interface PaymentGateway {
  createIntent(request: PaymentIntentRequest): Promise<PaymentIntentResponse>;
}

