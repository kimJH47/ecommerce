import { convertToSearchParams } from '@/utils/Converter'
import type { Product } from '@/services/interfaces/Product'

export async function searchFirstPage(category: string): Promise<Product[]> {
  return fetch(`http://localhost:8080/api/v2/categoires/${category}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    }).then(data => {
      return data.entity.products
    }).catch(err => {
      console.log(err)
    })
}

export function searchProducts(
  category: string, page: number, SortType: SortType, name: string, brandName: string
): Promise<Product[]> {
  const params = convertToSearchParams({
    page: page,
    name: name,
    brandName: brandName,
    category: category,
    sort: SortType
  })
  return fetch(`http://localhost:8080/api/v2/categoires/${category}/detail?${params}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    }).then(data => {
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