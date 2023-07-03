import { object, string, number } from "yup";

export const productValidation = object({
    name: string().max(20).required(),
    description: string().required(),
    price: number().required(),
    stock: number().required(),
    quantity: number(),
    productimage : string(),
    offerId: number(),
    rating: number(),
    userId: number(),
    categoryId : number(),
    imageId: number() 
});
