import { Injectable } from '@nestjs/common';
import { StrapiService } from '../strapi/strapi.service';
import { StrapiEntity, StrapiSingleResponse } from '../common/types/strapi.types';
import { CartItem } from '../cart/interfaces/cart.interface';

interface OrderAttributes {
  orderNumber: string;
}

export interface OrderTotals {
  subtotal: number;
  taxAmount: number;
  shippingAmount?: number;
  discountAmount?: number;
  totalAmount: number;
  currency: string;
}

export interface CreateOrderPayload {
  orderNumber: string;
  customerId: number;
  shippingAddressId?: number;
  billingAddressId?: number;
  notes?: string;
  totals: OrderTotals;
}

@Injectable()
export class OrdersService {
  constructor(private readonly strapi: StrapiService) {}

  async createOrder(payload: CreateOrderPayload): Promise<StrapiEntity<OrderAttributes>> {
    const response = await this.strapi.post<StrapiSingleResponse<OrderAttributes>>('/orders', {
      data: {
        orderNumber: payload.orderNumber,
        status: 'pending',
        paymentStatus: 'pending',
        subtotal: payload.totals.subtotal,
        taxAmount: payload.totals.taxAmount,
        shippingAmount: payload.totals.shippingAmount ?? 0,
        discountAmount: payload.totals.discountAmount ?? 0,
        totalAmount: payload.totals.totalAmount,
        currency: payload.totals.currency,
        customer: payload.customerId,
        shippingAddress: payload.shippingAddressId,
        billingAddress: payload.billingAddressId,
        notes: payload.notes,
      },
    });

    if (!response.data) {
      throw new Error('Failed to create order');
    }

    return response.data;
  }

  async addOrderItems(orderId: number, cartItems: CartItem[]) {
    for (const item of cartItems) {
      await this.strapi.post('/order-items', {
        data: {
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.subtotal,
          discountAmount: 0,
          productSnapshot: item.productSnapshot,
          order: orderId,
          product: item.productId,
        },
      });

      await this.updateInventory(item.productId, item.quantity);
    }
  }

  async markOrderPaid(orderId: number) {
    await this.strapi.put(`/orders/${orderId}`, {
      data: {
        status: 'confirmed',
        paymentStatus: 'paid',
      },
    });
  }

  private async updateInventory(productId: number, quantityPurchased: number) {
    const productResponse = await this.strapi.get<StrapiSingleResponse<{ stockQuantity: number }>>(
      `/products/${productId}`,
    );
    const currentStock = productResponse.data?.attributes.stockQuantity ?? 0;
    const newStock = Math.max(currentStock - quantityPurchased, 0);

    await this.strapi.put(`/products/${productId}`, {
      data: {
        stockQuantity: newStock,
      },
    });
  }
}

