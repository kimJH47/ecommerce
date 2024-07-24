import type { SortType } from '@/services/productService'

export interface ProductSearchCondition {
  page: number
  category: string
  sortOrder: string
  searchQuery: string | null
  minPrice: number | null
  maxPrice: number | null
}