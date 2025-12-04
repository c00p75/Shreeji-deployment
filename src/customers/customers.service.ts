import { Injectable } from '@nestjs/common';
import { StrapiService } from '../strapi/strapi.service';
import { StrapiEntity, StrapiSingleResponse } from '../common/types/strapi.types';

export interface CustomerInput {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AddressInput {
  type: 'shipping' | 'billing';
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone?: string;
}

interface CustomerAttributes {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface AddressAttributes {
  type: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone?: string;
}

@Injectable()
export class CustomersService {
  constructor(private readonly strapi: StrapiService) {}

  async ensureCustomer(customer: CustomerInput): Promise<number> {
    // Try to find existing customer by email
    try {
      const response = await this.strapi.get<{ data: StrapiEntity<CustomerAttributes>[] }>('/customers', {
        params: {
          'filters[email][$eq]': customer.email,
        },
      });

      if (response.data && response.data.length > 0) {
        return response.data[0].id;
      }
    } catch (error) {
      // Customer doesn't exist, create new one
    }

    // Create new customer
    const createResponse = await this.strapi.post<StrapiSingleResponse<CustomerAttributes>>('/customers', {
      data: {
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
      },
    });

    if (!createResponse.data) {
      throw new Error('Failed to create customer');
    }

    return createResponse.data.id;
  }

  async createAddress(customerId: number, address: AddressInput): Promise<number> {
    const response = await this.strapi.post<StrapiSingleResponse<AddressAttributes>>('/addresses', {
      data: {
        ...address,
        customer: customerId,
      },
    });

    if (!response.data) {
      throw new Error('Failed to create address');
    }

    return response.data.id;
  }
}

