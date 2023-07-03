"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const yup_1 = require("yup");
exports.userValidation = (0, yup_1.object)({
    username: (0, yup_1.string)().lowercase().max(20).required(),
    email: (0, yup_1.string)().required().email(),
    password: (0, yup_1.string)().required().min(6),
    confirm_password: (0, yup_1.string)().required(),
    phonenum: (0, yup_1.number)(),
    role: (0, yup_1.string)()
});
