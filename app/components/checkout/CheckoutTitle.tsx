'use client'

interface CheckoutTitleProps {
  currentStep: number
}

const stepTitles: Record<number, string> = {
  1: "Let's get your order ready!",
  2: "Almost there! Just review your order",
  3: "Final step! Complete your payment",
}

export default function CheckoutTitle({ currentStep }: CheckoutTitleProps) {
  const title = stepTitles[currentStep] || "You're almost there...!"

  return (
    <div className='mb-8 text-center bg-[var(--shreeji-primary)] rounded-xl py-2'>
      <h1 className='text-2xl font-semibold text-white'>{title}</h1>
    </div>
  )
}

