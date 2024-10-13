import { Category } from "./category.model";
import { Image } from "./image.model";
import { ProductVariation } from "./productVariation.model";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity?: number;
    isHireable: boolean;
    isForSale: boolean;
    stockQuantity: number;
    categories: Category[];
    variations: ProductVariation[];
    images: Image[];
}