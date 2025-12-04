export interface CheckoutCardDetails {
  cardId?: string;
  number?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
  cardholderName?: string;
  saveCard?: boolean;
}

export interface CheckoutMobileMoneyDetails {
  provider: 'mtn' | 'airtel' | 'zamtel' | 'orange';
  phoneNumber: string;
}

export interface CheckoutCustomerInput {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface CheckoutAddressInput {
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

export class CheckoutDto {
  cartId: string;
  customer: CheckoutCustomerInput;
  shippingAddress: CheckoutAddressInput;
  billingAddress?: CheckoutAddressInput;
  paymentMethod: string;
  cardDetails?: CheckoutCardDetails;
  mobileMoneyDetails?: CheckoutMobileMoneyDetails;
  notes?: string;
}

