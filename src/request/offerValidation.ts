import { object, string, number , date  } from "yup";

export const offerValidation = object({
    discoutPercentage: number().required(),
    startdate: date(),
    enddate: date(),
    offername:string()
});
