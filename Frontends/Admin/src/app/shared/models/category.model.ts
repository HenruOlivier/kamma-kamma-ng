import { Product } from "./product.model";

// category.model.ts
export interface Category {
    _id: string;
    name: string;
    description: string;
    products: Product[];  // Define a Product interface as well
}