"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offerValidation = void 0;
const yup_1 = require("yup");
exports.offerValidation = (0, yup_1.object)({
    discoutPercentage: (0, yup_1.number)().required(),
    startdate: (0, yup_1.date)(),
    enddate: (0, yup_1.date)(),
    offername: (0, yup_1.string)()
});
