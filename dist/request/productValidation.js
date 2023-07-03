"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const yup_1 = require("yup");
exports.productValidation = (0, yup_1.object)({
    name: (0, yup_1.string)().max(20).required(),
    description: (0, yup_1.string)().required(),
    price: (0, yup_1.number)().required(),
    stock: (0, yup_1.number)().required(),
    quantity: (0, yup_1.number)(),
    productimage: (0, yup_1.string)(),
    offerId: (0, yup_1.number)(),
    rating: (0, yup_1.number)(),
    userId: (0, yup_1.number)(),
    categoryId: (0, yup_1.number)(),
    imageId: (0, yup_1.number)()
});
