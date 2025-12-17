import { mapFormToCouponPayload } from '../couponMapper';

describe('mapFormToCouponPayload', () => {
  it('maps percentage discount form data to backend DTO payload', () => {
    const formData = {
      code: 'TEST10',
      description: '10% off',
      discountType: 'percentage' as const,
      discountValue: 10,
      minPurchaseAmount: 100,
      maxDiscountAmount: 50,
      usageLimit: 5,
      expiresAt: '2025-12-31',
      isActive: true,
      applicableTo: 'all' as const,
    };

    const payload = mapFormToCouponPayload(formData);

    expect(payload).toEqual({
      code: 'TEST10',
      name: '10% off',
      description: '10% off',
      type: 'percentage',
      value: 10,
      minimumOrderAmount: 100,
      maximumDiscountAmount: 50,
      usageLimit: 5,
      validUntil: '2025-12-31',
      isActive: true,
    });
  });

  it('maps fixed discount form data and omits maxDiscountAmount', () => {
    const formData = {
      code: 'FLAT50',
      description: '',
      discountType: 'fixed' as const,
      discountValue: 50,
      minPurchaseAmount: 0,
      maxDiscountAmount: 0,
      usageLimit: 0,
      expiresAt: '',
      isActive: false,
      applicableTo: 'all' as const,
    };

    const payload = mapFormToCouponPayload(formData);

    expect(payload).toEqual({
      code: 'FLAT50',
      name: 'FLAT50',
      description: undefined,
      type: 'fixed_amount',
      value: 50,
      minimumOrderAmount: undefined,
      maximumDiscountAmount: undefined,
      usageLimit: undefined,
      validUntil: undefined,
      isActive: false,
    });
  });
});



