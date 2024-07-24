import { convertToSearchParams } from '@/utils/Converter'
import type { Product } from '@/services/interfaces/Product'
import type { ProductSearchCondition } from '@/services/interfaces/ProductSearchCondition'

export async function searchFirstPage(category: string): Promise<Product[]> {
  return fetch(`http://localhost:8080/api/v2/categories/${category}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    }).then(data => {
      console.log(data)
      return data.entity.products
    }).catch(err => {
      console.log(err)
    })
}

export async function searchWithCondition(condition: ProductSearchCondition): Promise<Product[]> {
  const params = convertToSearchParams({
    page: condition.page,
    name: condition.searchQuery,
    brandName: condition.searchQuery,
    category: condition.category,
    sort: condition.sortOrder,
    maxPrice: condition.maxPrice,
    minPrice: condition.minPrice
  })
  return fetch(`http://localhost:8080/api/v2/categories/${condition.category}/detail?${params}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    }).then(data => {
      console.log(data)
      return data.entity.products
    }).catch(err => {
      console.log(err)
    })
}

export enum SortType {
  PRICE_HIGH = 'price_high',
  PRICE_LOW = 'price_low',
  NEW = 'new'
}