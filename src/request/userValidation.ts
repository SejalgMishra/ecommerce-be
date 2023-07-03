import { object, string, number } from "yup";

export const userValidation = object({
  username: string().lowercase().max(20).required(),
  email: string().required().email(),
  password: string().required().min(6),
  confirm_password: string().required(),
  phonenum: number(),
  role: string() 
});
