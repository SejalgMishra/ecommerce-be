"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const razorpay_1 = __importDefault(require("razorpay"));
const payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { amount } = req.body;
        var instance = new razorpay_1.default({
            key_id: "rzp_test_Ls1Ugr8RHpdrw2",
            key_secret: "482rN744FqAi8h0tLUD2adyd",
        });
        const order = yield instance.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: "receipt#1",
        });
        res.send({ order, amount });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = payment;
