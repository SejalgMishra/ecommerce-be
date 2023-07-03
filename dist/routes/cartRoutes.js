"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/cartRoutes.ts
const express_1 = __importDefault(require("express"));
const cartController_1 = __importDefault(require("../controller/cartController"));
const userAuth_1 = require("../middleware/userAuth");
const router = express_1.default.Router();
// Add products to cart
router.post('/cartItem', userAuth_1.userAuth, cartController_1.default.addToCart);
// Get all cart items for a user
router.get('/cartItem', userAuth_1.userAuth, cartController_1.default.getCart);
router.patch('/cartItem/:productId', userAuth_1.userAuth, cartController_1.default.editCartItem);
router.delete('/cartItem/:productId', userAuth_1.userAuth, cartController_1.default.deleteCartItem);
exports.default = router;
