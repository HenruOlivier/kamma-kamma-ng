import { Category } from "./category.model";
import { Image } from "./image.model";
import { ProductVariation } from "./productVariation.model";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity?: number;  // Optional field
    isHireable: boolean;
    isForSale: boolean;
    stockQuantity: number;
    categories: Category[];  // List of categories
    variations: ProductVariation[];  // List of variations
    images: Image[];  // List of images
}