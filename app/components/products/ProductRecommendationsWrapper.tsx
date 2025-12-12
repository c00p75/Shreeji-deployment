'use client'

import dynamic from 'next/dynamic'

// Lazy load ProductRecommendations to improve initial page load performance
// This wrapper is needed because ssr: false can only be used in client components
const ProductRecommendations = dynamic(
  () => import('@/app/components/products/ProductRecommendations'),
  { 
    ssr: false, // Disable SSR since it's client-side only and uses hooks
    loading: () => null // Don't show loading state - component handles its own loading
  }
)

interface ProductRecommendationsWrapperProps {
  productId: number
}

export default function ProductRecommendationsWrapper({ productId }: ProductRecommendationsWrapperProps) {
  return <ProductRecommendations productId={productId} />
}

