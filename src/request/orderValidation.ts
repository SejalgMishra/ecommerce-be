import { object, string, number , date , array } from "yup";

export const orderValidation = object({
    orderTime: date(),
    productId: number(),
    userId: number(),
});
