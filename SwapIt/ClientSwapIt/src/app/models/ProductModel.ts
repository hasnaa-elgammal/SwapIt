import { SubCategory } from "./SubCategory";

export class ProductModel {
    productId: number
    userId: string;
    departmentId: number;
    productName: string;
    productPrice: number;
    productQuantity: number;
    productSize: string;
    productDescription: string;
    forswap: boolean;
    forsell: boolean;
    subCategory:SubCategory;
    
}