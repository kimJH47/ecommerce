import { defineStore } from 'pinia'
import type { ProductSearchCondition } from '@/services/interfaces/ProductSearchCondition'

export const useStatusStore = defineStore('status', {
  state: () => ({
    isSuccess: false
  }),
  actions: {
    setSuccess(status: boolean) {
      this.isSuccess = status
    }
  }
})

export const useSearchConditionStore = defineStore('condition', {
  state: () => ({
    page: 1,
    category: null as string | null ,
    searchQuery: null as string | null,
    searchType: 'name',
    sortOrder: 'new',
    minPrice: null as number | null,
    maxPrice: null as number | null
  }),
  actions: {
    updateCondition(condition: ProductSearchCondition) {
      this.page = condition.page
      this.category = condition.category
      this.searchQuery = condition.searchQuery
      this.sortOrder = condition.sortOrder
      this.minPrice = condition.minPrice
      this.maxPrice = condition.maxPrice
      this.searchType = condition.searchType
    }
  },
  getters: {
    condition: (state) => ({
      page: state.page,
      category: state.category,
      searchQuery: state.searchQuery,
      searchType: state.searchType,
      minPrice: state.minPrice,
      maxPrice: state.maxPrice,
      sortOrder: state.sortOrder
    })
  }
})