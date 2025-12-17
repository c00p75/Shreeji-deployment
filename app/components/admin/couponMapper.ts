export type CouponFormData = {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchaseAmount: number;
  maxDiscountAmount: number;
  usageLimit: number;
  expiresAt: string;
  isActive: boolean;
  applicableTo: 'all' | 'categories' | 'products';
};

// Maps frontend coupon form data to backend CreateCouponDto/UpdateCouponDto shape
export function mapFormToCouponPayload(formData: CouponFormData) {
  return {
    code: formData.code,
    // Backend requires `name`; derive from description when available, otherwise fallback to code
    name: formData.description || formData.code,
    description: formData.description || undefined,
    // Backend enum: 'percentage' | 'fixed_amount'
    type: formData.discountType === 'percentage' ? 'percentage' : 'fixed_amount',
    value: formData.discountValue,
    minimumOrderAmount: formData.minPurchaseAmount || undefined,
    maximumDiscountAmount:
      formData.discountType === 'percentage'
        ? formData.maxDiscountAmount || undefined
        : undefined,
    usageLimit: formData.usageLimit || undefined,
    validUntil: formData.expiresAt || undefined,
    isActive: formData.isActive,
    // applicableProducts / applicableCategories will be wired up when UI supports them
  };
}



