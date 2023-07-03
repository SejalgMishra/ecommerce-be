"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidation = void 0;
const yup_1 = require("yup");
exports.orderValidation = (0, yup_1.object)({
    orderTime: (0, yup_1.date)(),
    productId: (0, yup_1.number)(),
    userId: (0, yup_1.number)(),
});
