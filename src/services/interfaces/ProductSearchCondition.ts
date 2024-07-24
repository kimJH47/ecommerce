export interface ProductSearchCondition {
  page: number
  category: string | null
  sortOrder: string
  searchQuery: string | null,
  searchType: string
  minPrice: number | null
  maxPrice: number | null
}