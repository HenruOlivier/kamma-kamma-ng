import { Category } from "./category.model";
import { Image } from "./image.model";
import { ProductVariation } from "./productVariation.model";

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    isHireable: boolean;
    isForSale: boolean;
    stockQuantity: number;
    variations: ProductVariation[];
    images: Image[];
}