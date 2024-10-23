import { Image } from "./image.model";
import { Product } from "./product.model";

export interface ProductVariation {
    _id: string;
    optionName: string;
    optionValue: string;
    price: number;
    stockQuantity: number;
    images: Image[];
    productId: number;
    product: Product;
}