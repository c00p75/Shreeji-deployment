'use client'

import { CreditCard, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import React from 'react'

import { CheckoutCardDetails, CheckoutMobileMoneyDetails } from '@/app/lib/ecommerce/api'

interface PaymentDetailsSectionProps {
  paymentMethod: string
  onPaymentMethodChange: (method: string) => void
  onPayment: () => void
  onPaymentDetailsChange?: (details: {
    cardDetails?: CheckoutCardDetails
    mobileMoneyDetails?: CheckoutMobileMoneyDetails
  }) => void
  isProcessing: boolean
}

interface SavedCard {
  id: string
  type: 'visa' | 'mastercard' | 'amex' | 'diners'
  last4: string
  expires: string
}

const mockCards: SavedCard[] = [
  { id: '1', type: 'visa', last4: '0817', expires: '10-19' },
  { id: '2', type: 'mastercard', last4: '2563', expires: '10-19' },
  { id: '3', type: 'amex', last4: '4521', expires: '12-25' },
  { id: '4', type: 'diners', last4: '7890', expires: '08-24' },
]

const mobileMoneyProviders = [
  { value: 'mtn', label: 'MTN Mobile Money' },
  { value: 'airtel', label: 'Airtel Money' },
  { value: 'zamtel', label: 'Zamtel Kwacha' },
  { value: 'orange', label: 'Orange Money' },
]

export default function PaymentDetailsSection({
  paymentMethod,
  onPaymentMethodChange,
  onPayment,
  onPaymentDetailsChange,
  isProcessing,
}: PaymentDetailsSectionProps) {
  const [selectedCardId, setSelectedCardId] = useState<string | null>('1')
  const [selectedMobileProvider, setSelectedMobileProvider] = useState<string>('mtn')
  const [mobileNumber, setMobileNumber] = useState<string>('')
  const [showNewCardForm, setShowNewCardForm] = useState(false)
  const [newCardData, setNewCardData] = useState({
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    saveCard: false,
  })

  const paymentMethods = [
    { value: 'card', label: 'Credit / Debit Card (Visa, MasterCard, AmEx, Diners)' },
    { value: 'mobile_money', label: 'Mobile Money' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'cod', label: 'Cash on Delivery' },
  ]

  // Validate mobile number format (Zambian format: 09XX XXX XXX or +260 XXX XXX XXX)
  const validateMobileNumber = (number: string): boolean => {
    const cleaned = number.replace(/\s+/g, '').replace(/^\+260/, '0')
    return /^0[0-9]{9}$/.test(cleaned)
  }

  // Update payment details when they change
  const updatePaymentDetails = () => {
    if (!onPaymentDetailsChange) return

    if (paymentMethod === 'card') {
      if (showNewCardForm && newCardData.number) {
        onPaymentDetailsChange({
          cardDetails: {
            number: newCardData.number.replace(/\s+/g, ''),
            expiryMonth: newCardData.expiryMonth,
            expiryYear: newCardData.expiryYear,
            cvv: newCardData.cvv,
            cardholderName: newCardData.cardholderName,
          },
        })
      } else if (selectedCardId) {
        onPaymentDetailsChange({
          cardDetails: {
            cardId: selectedCardId,
          },
        })
      } else {
        onPaymentDetailsChange({})
      }
    } else if (paymentMethod === 'mobile_money') {
      if (mobileNumber && validateMobileNumber(mobileNumber)) {
        onPaymentDetailsChange({
          mobileMoneyDetails: {
            provider: selectedMobileProvider as 'mtn' | 'airtel' | 'zamtel' | 'orange',
            phoneNumber: mobileNumber.replace(/\s+/g, '').replace(/^\+260/, '0'),
          },
        })
      } else {
        onPaymentDetailsChange({})
      }
    } else {
      onPaymentDetailsChange({})
    }
  }

  // Update details when payment method or inputs change
  useEffect(() => {
    updatePaymentDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod, selectedCardId, showNewCardForm, newCardData, selectedMobileProvider, mobileNumber])

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-3'>
        <CreditCard className='h-5 w-5 text-[#544829]' />
        <h2 className='text-xl font-semibold text-gray-900'>Payment Details</h2>
      </div>

      <div className='space-y-3'>
        {paymentMethods.map((method) => (
          <label
            key={method.value}
            className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-3 transition-all ${
              paymentMethod === method.value
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <input
              type='radio'
              name='paymentMethod'
              value={method.value}
              checked={paymentMethod === method.value}
              onChange={(e) => onPaymentMethodChange(e.target.value)}
              className='h-4 w-4 text-green-600 focus:ring-green-500'
            />
            <span className='text-sm font-medium text-gray-900'>{method.label}</span>
          </label>
        ))}
      </div>

      {paymentMethod === 'card' && (
        <div className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {mockCards.map((card) => (
              <div
                key={card.id}
                onClick={() => setSelectedCardId(card.id)}
                className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                  selectedCardId === card.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className='mb-2 flex items-center justify-between'>
                  {card.type === 'visa' ? (
                    <div className='text-2xl font-bold text-blue-600'>VISA</div>
                  ) : card.type === 'mastercard' ? (
                    <div className='flex items-center gap-1'>
                      <div className='h-6 w-6 rounded-full bg-red-500'></div>
                      <div className='h-6 w-6 rounded-full bg-yellow-500 -ml-2'></div>
                    </div>
                  ) : card.type === 'amex' ? (
                    <div className='text-lg font-bold text-blue-800'>AMEX</div>
                  ) : (
                    <div className='text-lg font-bold text-orange-600'>DINERS</div>
                  )}
                </div>
                <p className='text-sm font-medium text-gray-900'>•••• •••• •••• {card.last4}</p>
                <p className='mt-1 text-xs text-gray-600'>Expires {card.expires}</p>
              </div>
            ))}

            <button
              type='button'
              onClick={() => {
                setShowNewCardForm(true)
                setSelectedCardId(null)
              }}
              className='flex min-h-[120px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-gray-600 transition-colors hover:border-gray-400 hover:bg-gray-100'
            >
              <svg className='mb-2 h-8 w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
              </svg>
              <span className='text-sm font-medium'>Add New Card</span>
            </button>
          </div>

          {showNewCardForm && (
            <div className='space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold text-gray-900'>Add New Card</h3>
                <button
                  type='button'
                  onClick={() => {
                    setShowNewCardForm(false)
                    setNewCardData({
                      number: '',
                      expiryMonth: '',
                      expiryYear: '',
                      cvv: '',
                      cardholderName: '',
                      saveCard: false,
                    })
                    setSelectedCardId('1')
                  }}
                  className='text-gray-400 hover:text-gray-600'
                >
                  <X className='h-5 w-5' />
                </button>
              </div>

              <div className='space-y-3'>
                <div>
                  <label htmlFor='cardNumber' className='mb-1 block text-sm font-medium text-gray-700'>
                    Card Number
                  </label>
                  <input
                    id='cardNumber'
                    type='text'
                    value={newCardData.number}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s+/g, '').replace(/\D/g, '')
                      const formatted = value.match(/.{1,4}/g)?.join(' ') || value
                      setNewCardData({ ...newCardData, number: formatted })
                    }}
                    placeholder='1234 5678 9012 3456'
                    maxLength={19}
                    className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500'
                  />
                </div>

                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <label htmlFor='expiryMonth' className='mb-1 block text-sm font-medium text-gray-700'>
                      Month
                    </label>
                    <input
                      id='expiryMonth'
                      type='text'
                      value={newCardData.expiryMonth}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 2)
                        if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 12)) {
                          setNewCardData({ ...newCardData, expiryMonth: value })
                        }
                      }}
                      placeholder='MM'
                      maxLength={2}
                      className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500'
                    />
                  </div>
                  <div>
                    <label htmlFor='expiryYear' className='mb-1 block text-sm font-medium text-gray-700'>
                      Year
                    </label>
                    <input
                      id='expiryYear'
                      type='text'
                      value={newCardData.expiryYear}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 4)
                        setNewCardData({ ...newCardData, expiryYear: value })
                      }}
                      placeholder='YYYY'
                      maxLength={4}
                      className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <label htmlFor='cvv' className='mb-1 block text-sm font-medium text-gray-700'>
                      CVV
                    </label>
                    <input
                      id='cvv'
                      type='text'
                      value={newCardData.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 4)
                        setNewCardData({ ...newCardData, cvv: value })
                      }}
                      placeholder='123'
                      maxLength={4}
                      className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500'
                    />
                  </div>
                  <div>
                    <label htmlFor='cardholderName' className='mb-1 block text-sm font-medium text-gray-700'>
                      Cardholder Name
                    </label>
                    <input
                      id='cardholderName'
                      type='text'
                      value={newCardData.cardholderName}
                      onChange={(e) => setNewCardData({ ...newCardData, cardholderName: e.target.value })}
                      placeholder='John Doe'
                      className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500'
                    />
                  </div>
                </div>

                <label className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    checked={newCardData.saveCard}
                    onChange={(e) => setNewCardData({ ...newCardData, saveCard: e.target.checked })}
                    className='h-4 w-4 text-green-600 focus:ring-green-500'
                  />
                  <span className='text-sm text-gray-700'>Save this card for future purchases</span>
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      {paymentMethod === 'mobile_money' && (
        <div className='space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4'>
          <div className='space-y-3'>
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>Select Mobile Money Provider</label>
              <div className='grid grid-cols-2 gap-3'>
                {mobileMoneyProviders.map((provider) => (
                  <label
                    key={provider.value}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                      selectedMobileProvider === provider.value
                        ? 'border-green-500 bg-white'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <input
                      type='radio'
                      name='mobileProvider'
                      value={provider.value}
                      checked={selectedMobileProvider === provider.value}
                      onChange={(e) => setSelectedMobileProvider(e.target.value)}
                      className='h-4 w-4 text-green-600 focus:ring-green-500'
                    />
                    <span className='text-sm font-medium text-gray-900'>{provider.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor='mobileNumber' className='mb-2 block text-sm font-medium text-gray-700'>
                Mobile Number
              </label>
              <input
                id='mobileNumber'
                type='tel'
                value={mobileNumber}
                onChange={(e) => {
                  let value = e.target.value.replace(/\s+/g, '')
                  // Auto-format Zambian numbers
                  if (value.startsWith('+260')) {
                    value = '0' + value.slice(4)
                  }
                  setMobileNumber(value)
                }}
                placeholder='0977123456 or +260977123456'
                className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500'
              />
              <p className='mt-1 text-xs text-gray-500'>
                Enter the mobile number linked to your {mobileMoneyProviders.find(p => p.value === selectedMobileProvider)?.label} account
              </p>
              {mobileNumber && !validateMobileNumber(mobileNumber) && (
                <p className='mt-1 text-xs text-red-600'>Please enter a valid mobile number (e.g., 0977123456)</p>
              )}
            </div>
          </div>
        </div>
      )}

      {paymentMethod === 'bank_transfer' && (
        <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
          <p className='text-sm text-gray-600'>
            You will receive bank transfer instructions after placing your order. Please complete the transfer within 24 hours to confirm your order.
          </p>
        </div>
      )}

      <button
        type='button'
        onClick={onPayment}
        disabled={
          isProcessing ||
          (paymentMethod === 'card' && !selectedCardId && !showNewCardForm) ||
          (paymentMethod === 'card' && showNewCardForm && (!newCardData.number || !newCardData.expiryMonth || !newCardData.expiryYear || !newCardData.cvv || !newCardData.cardholderName)) ||
          (paymentMethod === 'mobile_money' && (!mobileNumber || !validateMobileNumber(mobileNumber)))
        }
        className='w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50'
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  )
}

