'use client'

import { useCart } from '@/app/contexts/CartContext'
import { useClientAuth } from '@/app/contexts/ClientAuthContext'
import { useState, useEffect, useCallback } from 'react'
import CheckoutTopBar from '@/app/components/checkout/CheckoutTopBar'
import CheckoutTitle from '@/app/components/checkout/CheckoutTitle'
import CheckoutAlerts from '@/app/components/checkout/CheckoutAlerts'
import CheckoutSteps from '@/app/components/checkout/CheckoutSteps'
import CheckoutNavigation from '@/app/components/checkout/CheckoutNavigation'
import StickyCheckoutNavigation from '@/app/components/checkout/StickyCheckoutNavigation'
import DeliveryPickupToggle from '@/app/components/checkout/DeliveryPickupToggle'
import DeliveryAddressSection from '@/app/components/checkout/DeliveryAddressSection'
import PickupLocationSection from '@/app/components/checkout/PickupLocationSection'
import OrderSummarySection from '@/app/components/checkout/OrderSummarySection'
import PaymentDetailsSection from '@/app/components/checkout/PaymentDetailsSection'
import OrderDetailsSidebar from '@/app/components/checkout/OrderDetailsSidebar'
import AddressModal from '@/app/components/checkout/AddressModal'
import { ShoppingBag, Gift } from 'lucide-react'
import clientApi from '@/app/lib/client/api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const CHECKOUT_STEPS = [
  { label: 'Review', number: 1 },
  { label: 'Fulfillment & Address', number: 2 },
  { label: 'Payment', number: 3 },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, loading, checkout, isCheckingOut, error: cartError } = useCart()
  const { user, isAuthenticated, loading: authLoading } = useClientAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [formError, setFormError] = useState<string | null>(null)
  const [success, setSuccess] = useState<{ orderNumber: string; orderId: number; paymentStatus: string; redirectUrl?: string; requiresAction?: boolean } | null>(null)
  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'delivery'>('pickup')
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [addresses, setAddresses] = useState<any[]>([])
  const [loadingAddresses, setLoadingAddresses] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState('cop')
  const [paymentDetails, setPaymentDetails] = useState<{
    cardDetails?: { cardId?: string; number?: string; expiryMonth?: string; expiryYear?: string; cvv?: string; cardholderName?: string; saveCard?: boolean }
    mobileMoneyDetails?: { provider: 'mtn' | 'airtel' | 'zamtel' | 'orange'; phoneNumber: string }
    pickupDetails?: {
      preferredPickupDate: string
      preferredPickupTime: string
      collectingPersonName?: string
      collectingPersonPhone?: string
      collectingPersonRelationship?: string
      vehicleInfo?: string
      idType?: 'nrc' | 'passport' | 'drivers_license' | 'other'
      idNumber?: string
      specialInstructions?: string
    }
  }>({})
  const [showRecoveryMessage, setShowRecoveryMessage] = useState(false)
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  const [availablePoints, setAvailablePoints] = useState<number>(0)
  const [pointsToRedeem, setPointsToRedeem] = useState<number>(0)
  const [loadingPoints, setLoadingPoints] = useState(false)
  const [pointsError, setPointsError] = useState<string | null>(null)

  // Restore checkout progress on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && !success) {
      const saved = sessionStorage.getItem('checkout_progress')
      if (saved) {
        try {
          const state = JSON.parse(saved)
          if (state.currentStep && state.currentStep > 1) {
            setShowRecoveryMessage(true)
            setCurrentStep(state.currentStep)
            setFulfillmentType(state.fulfillmentType || 'pickup')
            setSelectedAddressId(state.selectedAddressId || null)
            setPaymentMethod(state.paymentMethod || 'cop')
          }
        } catch (err) {
          console.error('Failed to restore checkout state', err)
        }
      }
    }
  }, [success])

  // Save checkout progress whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && !success && currentStep > 1) {
      const checkoutState = {
        currentStep,
        fulfillmentType,
        selectedAddressId,
        paymentMethod,
        // Don't save sensitive payment details
      }
      sessionStorage.setItem('checkout_progress', JSON.stringify(checkoutState))
    }
  }, [currentStep, fulfillmentType, selectedAddressId, paymentMethod, success])

  // Clear checkout progress on successful completion
  useEffect(() => {
    if (success && typeof window !== 'undefined') {
      sessionStorage.removeItem('checkout_progress')
    }
  }, [success])

  const loadUserData = useCallback(async () => {
    try {
      setLoadingAddresses(true)
      const [profileResponse, addressesResponse] = await Promise.all([
        clientApi.getProfile().catch(() => null),
        clientApi.getAddresses().catch(() => ({ data: [] })),
      ])

      if (profileResponse?.data) {
        setUserProfile(profileResponse.data)
      }

      if (addressesResponse?.data) {
        setAddresses(addressesResponse.data)
        // Select default address if available
        const defaultAddress = addressesResponse.data.find((addr: any) => addr.isDefault)
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id.toString())
        } else if (addressesResponse.data.length > 0) {
          setSelectedAddressId(addressesResponse.data[0].id.toString())
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoadingAddresses(false)
    }
  }, [])

  const loadLoyaltyPoints = useCallback(async () => {
    if (!isAuthenticated) return
    try {
      setLoadingPoints(true)
      const res = await clientApi.getLoyaltyPoints()
      setAvailablePoints(res.data?.points || 0)
      setPointsError(null)
    } catch (error) {
      console.error('Error loading loyalty points:', error)
      setPointsError('Failed to load loyalty points')
    } finally {
      setLoadingPoints(false)
    }
  }, [isAuthenticated])

  // Load user profile and addresses if authenticated
  // This will automatically trigger when auth state changes (e.g., after login)
  useEffect(() => {
    // Wait for auth loading to complete before checking auth state
    if (!authLoading) {
      if (isAuthenticated) {
        loadUserData()
        loadLoyaltyPoints()
      } else {
        // Clear user data if not authenticated
        setAddresses([])
        setUserProfile(null)
        setSelectedAddressId(null)
        setAvailablePoints(0)
        setPointsToRedeem(0)
      }
    }
  }, [isAuthenticated, authLoading, loadUserData, loadLoyaltyPoints])

  const handleAddAddress = () => {
    setIsAddressModalOpen(true)
  }

  const handleAddressAdded = async () => {
    // Reload addresses after successful creation
    if (isAuthenticated) {
      await loadUserData()
    }
  }

  const handleNext = () => {
    setFormError(null)

    // Validate current step before proceeding
    if (currentStep === 1) {
      // Step 1: Review - proceed to fulfillment & address
      setCurrentStep(2)
    } else if (currentStep === 2) {
      // Step 2: Fulfillment & Address - validate if delivery
      if (fulfillmentType === 'delivery' && !selectedAddressId) {
        setFormError('Please select a delivery address.')
        return
      }
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
      // Get customer data from authenticated user or use form data
      let customerData
      let shippingAddressData

      if (isAuthenticated && userProfile) {
        // Use authenticated user data
        customerData = {
          email: userProfile.email,
          firstName: userProfile.firstName || user?.firstName || '',
          lastName: userProfile.lastName || user?.lastName || '',
          phone: userProfile.phone || '',
        }

        // Get selected address if delivery
        if (fulfillmentType === 'delivery' && selectedAddressId) {
          const selectedAddress = addresses.find(
            (addr) => addr.id.toString() === selectedAddressId
          )
          if (selectedAddress) {
            shippingAddressData = {
              firstName: selectedAddress.firstName,
              lastName: selectedAddress.lastName,
              addressLine1: selectedAddress.addressLine1,
              addressLine2: selectedAddress.addressLine2 || '',
              city: selectedAddress.city,
              state: selectedAddress.state || '',
              postalCode: selectedAddress.postalCode,
              country: selectedAddress.country,
              phone: selectedAddress.phone || customerData.phone,
            }
          }
        }
      } else {
        // Guest checkout - would need form data, for now using defaults
        // TODO: Add guest checkout form
        customerData = {
          email: user?.email || 'guest@example.com',
          firstName: user?.firstName || 'Guest',
          lastName: user?.lastName || 'User',
          phone: '',
        }

        if (fulfillmentType === 'delivery' && selectedAddressId) {
          const selectedAddress = addresses.find(
            (addr) => addr.id.toString() === selectedAddressId
          )
          if (selectedAddress) {
            shippingAddressData = {
              firstName: selectedAddress.firstName,
              lastName: selectedAddress.lastName,
              addressLine1: selectedAddress.addressLine1,
              addressLine2: selectedAddress.addressLine2 || '',
              city: selectedAddress.city,
              state: selectedAddress.state || '',
              postalCode: selectedAddress.postalCode,
              country: selectedAddress.country,
              phone: selectedAddress.phone || '',
            }
          }
        }
      }

      // If no address selected for delivery, show error
      if (fulfillmentType === 'delivery' && !shippingAddressData) {
        setFormError('Please select a delivery address.')
        return
      }

      // Validate points redemption
      if (pointsToRedeem > availablePoints) {
        setPointsError(`You can only redeem up to ${availablePoints} points (ZMW ${(availablePoints / 100).toFixed(2)})`)
        setFormError('Please correct the points redemption amount.')
        return
      }

      // Map frontend payment method to backend payment method
      let backendPaymentMethod = paymentMethod
      if (paymentMethod === 'card') {
        // Determine if it's credit or debit card (simplified - could be enhanced)
        backendPaymentMethod = 'credit_card'
      } else if (paymentMethod === 'cop') {
        backendPaymentMethod = 'cash_on_pickup'
      }

      const maxPointsAllowed = cart?.total ? Math.floor(cart.total * 100) : availablePoints
      const pointsToUse = Math.max(0, Math.min(pointsToRedeem, availablePoints, maxPointsAllowed))

      // Build checkout payload - only include payment details when relevant and valid
      const checkoutPayload: any = {
        customer: customerData,
        shippingAddress: shippingAddressData,
        billingAddress: undefined, // Use same as shipping for now
        paymentMethod: backendPaymentMethod,
        notes: fulfillmentType === 'pickup' ? 'Pickup order' : '',
      }

      if (pointsToUse > 0) {
        checkoutPayload.pointsToRedeem = pointsToUse
      }

      // Only include cardDetails if payment method is card and details exist
      if (backendPaymentMethod === 'credit_card' && paymentDetails.cardDetails) {
        // Only include if it has either cardId or all required card fields
        if (
          paymentDetails.cardDetails.cardId ||
          (paymentDetails.cardDetails.number &&
            paymentDetails.cardDetails.expiryMonth &&
            paymentDetails.cardDetails.expiryYear &&
            paymentDetails.cardDetails.cvv &&
            paymentDetails.cardDetails.cardholderName)
        ) {
          checkoutPayload.cardDetails = paymentDetails.cardDetails
        }
      }

      // Only include mobileMoneyDetails if payment method is mobile_money and details exist
      if (backendPaymentMethod === 'mobile_money' && paymentDetails.mobileMoneyDetails) {
        // Only include if it has both provider and phoneNumber
        if (paymentDetails.mobileMoneyDetails.provider && paymentDetails.mobileMoneyDetails.phoneNumber) {
          checkoutPayload.mobileMoneyDetails = paymentDetails.mobileMoneyDetails
        }
      }

      // Only include pickupDetails if payment method is cash_on_pickup and details exist
      if (backendPaymentMethod === 'cash_on_pickup' && paymentDetails.pickupDetails) {
        // Only include if it has required fields
        if (
          paymentDetails.pickupDetails.preferredPickupDate &&
          paymentDetails.pickupDetails.preferredPickupTime &&
          paymentDetails.pickupDetails.idType &&
          paymentDetails.pickupDetails.idNumber
        ) {
          checkoutPayload.pickupDetails = paymentDetails.pickupDetails
        }
      }

      const response = await checkout(checkoutPayload)

      // Handle payment redirect (for DPO gateway)
      if (response.redirectUrl && response.requiresAction) {
        // Store order info for return
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('pendingOrder', JSON.stringify({
            orderNumber: response.orderNumber,
            orderId: response.orderId,
          }))
        }
        // Redirect to payment gateway
        window.location.href = response.redirectUrl
        return
      }

      setSuccess({
        orderNumber: response.orderNumber,
        orderId: response.orderId,
        paymentStatus: response.paymentStatus,
      })
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Checkout failed. Please try again.')
    }
  }

  const canProceedToNext = (): boolean => {
    switch (currentStep) {
      case 1:
        return true // Review always valid
      case 2:
        return fulfillmentType === 'pickup' || selectedAddressId !== null
      case 3:
        if (paymentMethod === 'cop') {
          // For cash on pickup, require pickup details
          return !!(
            paymentDetails.pickupDetails?.preferredPickupDate && 
            paymentDetails.pickupDetails?.preferredPickupTime &&
            paymentDetails.pickupDetails?.idType &&
            paymentDetails.pickupDetails?.idNumber
          )
        }
        return paymentMethod !== ''
      default:
        return false
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-[#f5f1e8] pt-24'>
        <div className='mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8'>
          <div className="h-8 bg-gray-200 rounded w-64 animate-pulse mb-8"></div>
          <div className="space-y-6 animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#f5f1e8] pt-24'>
      <div className='mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8'>
        <CheckoutTitle currentStep={currentStep} />

        {/* Recovery Message */}
        {showRecoveryMessage && (
          <div className='mb-4 rounded-md bg-blue-50 border border-blue-200 p-4 text-blue-800'>
            <div className='flex items-start justify-between'>
              <div>
                <p className='font-semibold'>Welcome back!</p>
                <p className='text-sm mt-1'>We've restored your checkout progress. You can continue where you left off.</p>
              </div>
              <button
                onClick={() => setShowRecoveryMessage(false)}
                className='ml-4 text-blue-600 hover:text-blue-800 text-sm font-medium'
                aria-label='Dismiss message'
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <CheckoutAlerts
          cartError={cartError}
          formError={formError}
          success={success}
          paymentMethod={paymentMethod}
          onRetry={() => {
            setFormError(null)
            handlePayment()
          }}
        />

        <CheckoutSteps currentStep={currentStep} totalSteps={CHECKOUT_STEPS.length} steps={CHECKOUT_STEPS} />

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]'>
          {/* Left Column - Main Content */}
          <div className='space-y-8'>
            {/* Step 1: Review Order */}
            {currentStep === 1 && (
                <OrderSummarySection />
              
            )}

            {/* Step 2: Fulfillment & Address */}
            {currentStep === 2 && (
              <div className='space-y-6'>
                <DeliveryPickupToggle
                  fulfillmentType={fulfillmentType}
                  onFulfillmentTypeChange={setFulfillmentType}
                />
                {fulfillmentType === 'delivery' ? (
                  <DeliveryAddressSection
                    selectedAddressId={selectedAddressId}
                    onAddressSelect={setSelectedAddressId}
                    onAddAddress={handleAddAddress}
                    addresses={addresses}
                    loading={loadingAddresses}
                    isAuthenticated={isAuthenticated}
                  />
                ) : (
                  <PickupLocationSection />
                )}
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className='space-y-4'>
                <PaymentDetailsSection
                  paymentMethod={paymentMethod}
                  onPaymentMethodChange={setPaymentMethod}
                  onPayment={handlePayment}
                  onPaymentDetailsChange={setPaymentDetails}
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
          <div className='order-first lg:order-last lg:sticky lg:top-20 lg:self-start space-y-6'>
            <OrderDetailsSidebar fulfillmentType={fulfillmentType} currentStep={currentStep} />
            
            {/* Loyalty Points Section - Only show on Step 3 */}
            {currentStep === 3 && (
              <div className='rounded-2xl border border-gray-200 bg-white p-4 shadow-sm'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-900'>Use loyalty points</p>
                    <p className='text-xs text-gray-500'>Available: {availablePoints} points (ZMW {(availablePoints / 100).toFixed(2)})</p>
                  </div>
                  <Gift className='h-5 w-5 text-[var(--shreeji-primary)]' />
                </div>
                {isAuthenticated ? 
                  (<div className='mt-3 grid grid-cols-1 gap-3'>
                    <div>
                      <label className='block text-xs font-medium text-gray-700'>Points to redeem</label>
                      <input
                        type='number'
                        min={0}
                        value={pointsToRedeem}
                        onChange={(e) => {
                          const value = Number(e.target.value)
                          if (value < 0) {
                            setPointsToRedeem(0)
                            setPointsError(null)
                          } else {
                            setPointsToRedeem(value)
                            if (value <= availablePoints) {
                              setPointsError(null)
                            }
                          }
                        }}
                        className={`mt-1 w-full rounded-lg border px-3 py-2 ${
                          pointsToRedeem > availablePoints
                            ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:border-amber-500 focus:ring-amber-500'
                        }`}
                        disabled={loadingPoints}
                      />
                      {pointsToRedeem > availablePoints && (
                        <p className='mt-1 text-xs text-red-600'>
                          You can only redeem up to {availablePoints} points (ZMW {(availablePoints / 100).toFixed(2)})
                        </p>
                      )}
                      {pointsError && pointsToRedeem <= availablePoints && (
                        <p className='mt-1 text-xs text-red-600'>{pointsError}</p>
                      )}
                    </div>
                    <div className={`flex flex-col justify-end rounded-lg p-3 text-sm ${
                      pointsToRedeem > availablePoints
                        ? 'bg-red-50 text-red-700'
                        : 'bg-gray-50 text-gray-700'
                    }`}>
                      <span className='font-semibold'>Discount preview</span>
                      <span className={pointsToRedeem > availablePoints ? 'text-red-600' : ''}>
                        ZMW {(pointsToRedeem / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>) : (
                    <div className='mt-3 space-y-3'>
                      <p className='text-sm font-medium text-gray-900'>You need to be logged in to use loyalty points</p>
                      <button
                        onClick={() => {
                          // Store the return URL so we can redirect back after login
                          if (typeof window !== 'undefined') {
                            sessionStorage.setItem('returnUrl', '/checkout')
                          }
                          router.push('/portal/login')
                        }}
                        className='w-full px-4 py-2 bg-[var(--shreeji-primary)] text-white rounded-lg hover:bg-[#544829] transition-colors font-medium text-sm'
                      >
                        Sign In
                      </button>
                    </div>
                  )
                }
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Navigation */}
      {!success && (
        <StickyCheckoutNavigation
          currentStep={currentStep}
          totalSteps={CHECKOUT_STEPS.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          canProceed={canProceedToNext()}
          isLastStep={currentStep === CHECKOUT_STEPS.length}
          isProcessing={isCheckingOut}
        />
      )}

      {/* Address Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSuccess={handleAddressAdded}
      />
    </div>
  )
}
