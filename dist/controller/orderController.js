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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_1 = require("../models/order");
const product_1 = require("../models/product");
const user_1 = require("../models/user");
const cart_1 = require("../models/cart");
const razorpay_1 = __importDefault(require("razorpay"));
var instance = new razorpay_1.default({
    key_id: "rzp_test_Ls1Ugr8RHpdrw2",
    key_secret: "482rN744FqAi8h0tLUD2adyd",
});
class orderController {
}
exports.orderController = orderController;
_a = orderController;
orderController.createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, mobile, paymentMethod, paymentId, price, creditCard, cvv, upiId, } = req.body;
    const userId = req.body.id;
    let totalPrice = 0;
    try {
        // Find cart
        const cartProduct = yield cart_1.Cart.findAll({ where: { userId: userId } });
        console.log(cartProduct);
        if (!cartProduct) {
            res.status(404).json({ error: "Cart is empty" });
            return;
        }
        // Extract product details from cart items
        const products = cartProduct.map((cartProduct) => {
            const { productId, quantity, price } = cartProduct.dataValues;
            totalPrice += price;
            return {
                productId,
                quantity,
                price,
            };
        });
        // Create the order
        const order = yield order_1.Order.create({
            userId,
            products,
            paymentMethod,
            price: totalPrice,
            paymentId: null,
            creditCard: null,
            cvv: null,
            upiId: null,
        });
        // Destroy cart items
        // await Cart.destroy({
        //   where: {
        //     userId,
        //   },
        // });
        if (paymentMethod === "COD") {
            // Cash on Delivery payment method
            res.json({
                message: "Order created successfully",
                order,
                products,
                totalPrice,
            });
        }
        else if (paymentMethod === "CARD") {
            // Card Payment method
            if (!creditCard || !cvv) {
                res.status(400).json({ error: "Credit card details missing" });
                return;
            }
            // Save the payment ID in the order model
            order.setDataValue("paymentId", paymentId);
            order.dataValues.paymentId = paymentId;
            // Save the credit card and CVV in the order model
            order.setDataValue("creditCard", creditCard);
            order.dataValues.creditCard = creditCard;
            order.setDataValue("cvv", cvv);
            order.dataValues.cvv = cvv;
            yield order.save();
            res.json({
                message: "Order created successfully",
                order,
                products,
                totalPrice,
                paymentId,
            });
        }
        else if (paymentMethod === "ONLINE") {
            // Online Payment method (Razorpay)
            const razorpayOrder = yield instance.orders.create({
                amount: totalPrice * 100,
                currency: "INR",
                receipt: paymentId,
            });
            // Save the payment ID in the order model
            const payment = razorpayOrder.id;
            order.setDataValue("paymentId", payment);
            order.dataValues.paymentId = payment;
            yield order.save();
            res.json({
                message: "Order created successfully",
                order,
                products,
                totalPrice,
                paymentId: payment,
                receipt: order.dataValues.id
            });
        }
        else {
            res.status(400).json({ error: "Invalid payment method" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
orderController.cardDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const order = yield instance.payments.fetch(id);
        console.log(order);
        if (!order)
            return res.status(500).send("something occured");
        res.status(200).json({ success: true, data: order });
    }
    catch (err) {
        console.log(err);
    }
});
orderController.getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.id;
    try {
        // Create the order
        const order = yield order_1.Order.findAll({
            where: { userId: userId },
        });
        res.json({ order });
    }
    catch (error) {
        console.log(error);
    }
});
orderController.getOrderUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield order_1.Order.findAll({
            include: [
                {
                    model: product_1.Product,
                    as: "products",
                    attributes: ["id", "name", "price", "productimage"],
                },
            ],
            where: { userId: id },
        });
        if (order) {
            const user = yield user_1.User.findOne({
                where: { id }
            });
            res.json({ users: user, orders: order });
        }
    }
    catch (error) {
        console.log(error);
    }
});
orderController.makePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, userId } = req.body;
        const user = yield user_1.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const order = yield order_1.Order.findByPk(orderId);
        console.log(order, ";;;;;;;;order");
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        yield order.save();
        return res
            .status(200)
            .json({ success: true, message: "Payment successful" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
});
