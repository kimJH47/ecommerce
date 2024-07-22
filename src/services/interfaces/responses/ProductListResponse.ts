import type { Product } from '@/services/interfaces/Product'

export interface ProductListResponse{
  totalCount: number;
  products: Product[];
}