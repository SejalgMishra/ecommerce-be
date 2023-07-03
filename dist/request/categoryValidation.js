"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const yup_1 = require("yup");
exports.categoryValidation = (0, yup_1.object)({
    name: (0, yup_1.string)().max(20).required(),
    description: (0, yup_1.string)(),
});
