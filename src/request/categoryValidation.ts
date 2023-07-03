import { object, string,  } from "yup";

export const categoryValidation = object({
    name: string().max(20).required(),
    description: string(),
});
