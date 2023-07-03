"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderController_1 = require("../controller/orderController");
const express_1 = __importDefault(require("express"));
const payment_1 = __importDefault(require("../middleware/payment"));
const userAuth_1 = require("../middleware/userAuth");
const router = express_1.default.Router();
router.get("/order", userAuth_1.userAuth, orderController_1.orderController.getOrder);
router.post("/order", userAuth_1.userAuth, orderController_1.orderController.createOrder);
router.post("/orderDetails", orderController_1.orderController.cardDetail);
// router.post("/cart" , orderController.addToCart)
// router.get("/cart/:userId" , orderController.getUserCart)
router.get("/admin/order/:id", orderController_1.orderController.getOrderUser);
router.post("/user/payment", payment_1.default);
//  router.post("/user/payment" , orderController.makePayment)
exports.default = router;
