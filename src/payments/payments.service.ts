import { Injectable } from '@nestjs/common';
import { StrapiService } from '../strapi/strapi.service';
import { StrapiEntity, StrapiSingleResponse } from '../common/types/strapi.types';

export interface RecordPaymentPayload {
  orderId: number;
  customerId: number;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: string;
  transactionId?: string;
  gatewayResponse?: any;
  paymentProofUrl?: string;
}

interface PaymentAttributes {
  amount: number;
  currency: string;
  paymentMethod: string;
  status: string;
  transactionId?: string;
  gatewayResponse?: any;
  paymentProofUrl?: string;
}

@Injectable()
export class PaymentsService {
  constructor(private readonly strapi: StrapiService) {}

  async recordPayment(payload: RecordPaymentPayload): Promise<StrapiEntity<PaymentAttributes>> {
    const response = await this.strapi.post<StrapiSingleResponse<PaymentAttributes>>('/payments', {
      data: {
        amount: payload.amount,
        currency: payload.currency,
        paymentMethod: payload.paymentMethod,
        status: payload.status,
        transactionId: payload.transactionId,
        gatewayResponse: payload.gatewayResponse,
        paymentProofUrl: payload.paymentProofUrl,
        order: payload.orderId,
        customer: payload.customerId,
      },
    });

    if (!response.data) {
      throw new Error('Failed to record payment');
    }

    return response.data;
  }

  async updatePaymentStatus(paymentId: number, status: string, paymentProofUrl?: string): Promise<void> {
    await this.strapi.put(`/payments/${paymentId}`, {
      data: {
        status,
        ...(paymentProofUrl && { paymentProofUrl }),
      },
    });
  }

  async getPaymentByOrderId(orderId: number): Promise<StrapiEntity<PaymentAttributes> | null> {
    try {
      const response = await this.strapi.get<{ data: StrapiEntity<PaymentAttributes>[] }>('/payments', {
        params: {
          'filters[order][id][$eq]': orderId,
        },
      });
      return response.data?.[0] || null;
    } catch (error) {
      return null;
    }
  }
}

