import { Image } from "./image.model";

export interface VariationOption {
    value: string;
    price: number;
    stockQuantity: number;
    images: Image[];
}