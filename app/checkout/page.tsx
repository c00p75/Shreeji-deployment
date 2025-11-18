'use client'

import { useCart } from '@/app/contexts/CartContext'
import { useState } from 'react'
import CheckoutTopBar from '@/app/components/checkout/CheckoutTopBar'
import CheckoutTitle from '@/app/components/checkout/CheckoutTitle'
import CheckoutAlerts from '@/app/components/checkout/CheckoutAlerts'
import CheckoutSteps from '@/app/components/checkout/CheckoutSteps'
import CheckoutNavigation from '@/app/components/checkout/CheckoutNavigation'
import DeliveryPickupToggle from '@/app/components/checkout/DeliveryPickupToggle'
import DeliveryAddressSection from '@/app/components/checkout/DeliveryAddressSection'
import PickupLocationSection from '@/app/components/checkout/PickupLocationSection'
import OrderSummarySection from '@/app/components/checkout/OrderSummarySection'
import PaymentDetailsSection from '@/app/components/checkout/PaymentDetailsSection'
import OrderDetailsSidebar from '@/app/components/checkout/OrderDetailsSidebar'

const CHECKOUT_STEPS = [
  { label: 'Fulfillment & Address', number: 1 },
  { label: 'Review', number: 2 },
  { label: 'Payment', number: 3 },
]

export default function CheckoutPage() {
  const { cart, loading, checkout, isCheckingOut, error: cartError } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [formError, setFormError] = useState<string | null>(null)
  const [success, setSuccess] = useState<{ orderNumber: string; paymentStatus: string } | null>(null)
  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'delivery'>('pickup')
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>('1')
  const [paymentMethod, setPaymentMethod] = useState('card')

  const handleAddAddress = () => {
    // Handle add address modal/form
    console.log('Add address clicked')
  }

  const handleNext = () => {
    setFormError(null)

    // Validate current step before proceeding
    if (currentStep === 1) {
      // Step 1: Fulfillment & Address - validate if delivery
      if (fulfillmentType === 'delivery' && !selectedAddressId) {
        setFormError('Please select a delivery address.')
        return
      }
      setCurrentStep(2)
    } else if (currentStep === 2) {
      // Step 2: Review - proceed to payment
      setCurrentStep(3)
    } else if (currentStep === 3) {
      // Step 3: Payment - process checkout
      handlePayment()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setFormError(null)
    }
  }

  const handlePayment = async () => {
    setFormError(null)
    setSuccess(null)

    if (!cart || cart.items.length === 0) {
      setFormError('Your cart is empty.')
      return
    }

    if (fulfillmentType === 'delivery' && !selectedAddressId) {
      setFormError('Please select a delivery address.')
      return
    }

    try {
      // For now, using mock data - in real implementation, get address details from selectedAddressId
      const response = await checkout({
        customer: {
          email: 'customer@example.com',
          firstName: 'Customer',
          lastName: 'Name',
          phone: '08025908063',
        },
        shippingAddress:
          fulfillmentType === 'delivery'
            ? {
                firstName: 'Customer',
                lastName: 'Name',
                addressLine1: '124.rd Cross. D S Croad. Kanakapura',
                addressLine2: '',
                city: 'Bangalore',
                state: 'Karnataka',
                postalCode: '560078',
                country: 'India',
                phone: '08025908063',
              }
            : undefined,
        billingAddress: undefined,
        paymentMethod: paymentMethod === 'card' || paymentMethod === 'mobile_money' ? 'mock' : paymentMethod,
        notes: fulfillmentType === 'pickup' ? 'Pickup order' : '',
      })

      setSuccess({ orderNumber: response.orderNumber, paymentStatus: response.paymentStatus })
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Checkout failed. Please try again.')
    }
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return fulfillmentType === 'pickup' || selectedAddressId !== null
      case 2:
        return true // Review always valid
      case 3:
        return paymentMethod !== ''
      default:
        return false
    }
  }

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[var(--shreeji-primary)]'></div>
          <p className='mt-4 text-gray-600'>Loading your cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 pt-24'>
      <div className='mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8'>
        <CheckoutTitle currentStep={currentStep} />

        <CheckoutAlerts cartError={cartError} formError={formError} success={success} />

        <CheckoutSteps currentStep={currentStep} totalSteps={CHECKOUT_STEPS.length} steps={CHECKOUT_STEPS} />

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]'>
          {/* Left Column - Main Content */}
          <div className='space-y-8'>
            {/* Step 1: Fulfillment & Address */}
            {currentStep === 1 && (
              <div className='space-y-6 rounded-2xl bg-white p-6 shadow-sm'>
                <DeliveryPickupToggle
                  fulfillmentType={fulfillmentType}
                  onFulfillmentTypeChange={setFulfillmentType}
                />
                {fulfillmentType === 'delivery' ? (
                  <DeliveryAddressSection
                    selectedAddressId={selectedAddressId}
                    onAddressSelect={setSelectedAddressId}
                    onAddAddress={handleAddAddress}
                  />
                ) : (
                  <PickupLocationSection />
                )}
            </div>
          )}

            {/* Step 2: Review Order */}
            {currentStep === 2 && (
              <div className='rounded-2xl bg-white p-6 shadow-sm'>
                <div className='mb-6'>
                  <h2 className='text-xl font-semibold text-gray-900'>Order Summary</h2>
                  <p className='mt-1 text-sm text-gray-500'>Review your order details before proceeding to payment</p>
                      </div>
                <OrderSummarySection />
                <div className='mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4'>
                  <h3 className='mb-3 font-semibold text-gray-900'>Fulfillment Details</h3>
                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Method:</span>
                      <span className='font-medium text-gray-900'>{fulfillmentType === 'delivery' ? 'Delivery' : 'Store Pickup'}</span>
                    </div>
                    {fulfillmentType === 'delivery' && selectedAddressId && (
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>Address:</span>
                        <span className='font-medium text-gray-900'>Selected</span>
                </div>
              )}
            </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className='rounded-2xl bg-white p-6 shadow-sm'>
                <PaymentDetailsSection
                  paymentMethod={paymentMethod}
                  onPaymentMethodChange={setPaymentMethod}
                  onPayment={handlePayment}
                  isProcessing={isCheckingOut}
                />
              </div>
            )}

            {/* Navigation */}
            {!success && (
              <CheckoutNavigation
                currentStep={currentStep}
                totalSteps={CHECKOUT_STEPS.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
                canProceed={canProceedToNext()}
                isLastStep={currentStep === CHECKOUT_STEPS.length}
                isProcessing={isCheckingOut}
                nextButtonLabel={currentStep === 3 ? 'Complete Order' : undefined}
              />
            )}
            </div>

          {/* Right Column - Order Details Sidebar */}
          <div className='order-first lg:order-last lg:sticky lg:top-20 lg:self-start'>
            <OrderDetailsSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
