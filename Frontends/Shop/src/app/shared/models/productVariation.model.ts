import { Image } from "./image.model";
import { Product } from "./product.model";

export interface ProductVariation {
    id: number;
    optionName: string;
    optionValue: string;
    price: number;
    stockQuantity: number;
    images: Image[];
    productId: number;
    product: Product;
}