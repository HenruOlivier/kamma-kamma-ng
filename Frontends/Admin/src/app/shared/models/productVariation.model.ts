import { Image } from "./image.model";
import { VariationOption } from "./variationOption.model";

export interface ProductVariation {
    name: string;
    stockQuantity: number;
    images: Image[];
    // options: VariationOption[];
}