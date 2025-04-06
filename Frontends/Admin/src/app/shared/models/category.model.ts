import { Image } from "./image.model";
import { Product } from "./product.model";

// category.model.ts
export interface Category {
    _id: string;
    name: string;
    description: string;
    coverImage: Image;
    products: Product[];  // Define a Product interface as well
}