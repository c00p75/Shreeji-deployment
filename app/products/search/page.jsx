import { searchProducts } from '@/app/lib/client/products'
import SideGrid from '@/components/products/side grid'
import Breadcrumbs from '@/components/products/product category/breadcrumbs'
import SearchResultsList from '@/components/products/search/SearchResultsList'

export default async function SearchPage({ searchParams }) {
  const params = await searchParams
  const query = params?.q || ''
  const page = parseInt(params?.page || '1', 10)
  const pageSize = 12

  // Extract filter parameters from URL
  const filters = {
    category: params?.category || undefined,
    subcategory: params?.subcategory || undefined,
    brandId: params?.brandId ? parseInt(params.brandId, 10) : undefined,
    minPrice: params?.minPrice ? parseFloat(params.minPrice) : undefined,
    maxPrice: params?.maxPrice ? parseFloat(params.maxPrice) : undefined,
    inStockOnly: params?.inStockOnly === 'true' ? true : undefined,
  }

  // Remove undefined values
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== undefined)
  )

  let searchResults = { data: [], meta: { pagination: { page: 1, pageSize: 12, pageCount: 0, total: 0 } } }

  if (query && query.trim()) {
    try {
      searchResults = await searchProducts(
        query.trim(),
        page,
        pageSize,
        Object.keys(cleanFilters).length > 0 ? cleanFilters : undefined
      )
    } catch (error) {
      console.error('Error searching products:', error)
    }
  }

  return (
    <section className="products-main-section relative z-[1] h-fit min-h-screen gap-5 pb-[2rem] pl-1 pr-1 text-white md:pr-8">
      <SideGrid />
      <section className="main-grid relative flex flex-[3] flex-col gap-5 overflow-visible">
        <Breadcrumbs breadcrumbs={['Search', query ? `"${query}"` : '']} />
        <SearchResultsList 
          query={query} 
          products={searchResults.data} 
          pagination={searchResults.meta.pagination}
          initialFilters={cleanFilters}
        />
      </section>
    </section>
  )
}

