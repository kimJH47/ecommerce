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
    category: '',
    searchQuery: null as string | null,
    searchType: 'name',
    sortOrder: 'new',
    minPrice: null as number | null,
    maxPrice: null as number | null
  }),
  actions: {
    updateCondition(condition: ProductSearchCondition) {
      this.searchQuery = condition.searchQuery
      this.sortOrder = condition.sortOrder
      this.minPrice = condition.minPrice
      this.maxPrice = condition.maxPrice
      //this.searchType=condition.searchType
    }
  },
  getters: {
    condition: (state) => ({
      page: 1,
      category: state.category,
      sortOrder: state.sortOrder,
      searchQuery: state.searchQuery,
      minPrice: state.minPrice,
      maxPrice: state.maxPrice
    })
  }
})