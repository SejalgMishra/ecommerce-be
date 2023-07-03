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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = require("../models/cart");
const product_1 = require("../models/product");
class CartController {
}
_a = CartController;
CartController.addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.id;
        const { products } = req.body;
        const cartItems = [];
        let totalPrice = 0;
        let productPrices = [];
        for (const product of products) {
            const { productId, quantity } = product;
            // Check if the product already exists in the cart for the user
            const existingCartItem = yield cart_1.Cart.findOne({
                where: {
                    userId,
                    productId,
                },
            });
            if (existingCartItem) {
                res.json({ message: "This product is already in your cart" });
                return;
            }
            else {
                // Retrieve product price from the Product model
                const productPrice = yield product_1.Product.findByPk(productId, {
                    attributes: ["price", "productimage", "name", "rating", "quantity", "id"],
                });
                if (!productPrice) {
                    throw new Error(`Product with ID ${productId} not found.`);
                }
                // Product price
                const price = productPrice.dataValues.price;
                // Multiply price with quantity to calculate the final price
                const productTotalPrice = quantity * price;
                // Add the product total price to the overall totalPrice
                totalPrice += productTotalPrice;
                // Create a new cart item
                const cartItem = {
                    userId,
                    productId,
                    quantity,
                    price: productTotalPrice,
                };
                cartItems.push(cartItem);
                productPrices.push(Object.assign(Object.assign({}, productPrice.dataValues), { quantity }));
            }
            yield cart_1.Cart.bulkCreate(cartItems);
            res.json({
                message: "Products added to cart successfully",
                totalPrice,
                productPrice: productPrices,
                productId
            });
        }
        // Bulk create cart items
    }
    catch (error) {
        console.error(error);
        res.json({ error });
    }
});
CartController.getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.id;
    try {
        if (userId) {
            const cartItems = yield cart_1.Cart.findAll({
                where: {
                    userId: userId,
                },
                include: [
                    {
                        model: product_1.Product,
                        as: "product",
                        attributes: ["name", "productimage"],
                    },
                ],
            });
            const cartData = cartItems.map((cartItem) => {
                const { productId, quantity, price, product } = cartItem.dataValues;
                const { name, productimage } = product.dataValues;
                return {
                    productId,
                    quantity,
                    price,
                    name,
                    productimage,
                };
            });
            res.json(cartData);
        }
        else {
            res.json({ msg: "No user found" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
CartController.editCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const userId = req.body.id;
        const { quantity } = req.body;
        // Retrieve the cart item to be edited
        const cartItem = yield cart_1.Cart.findOne({
            where: {
                userId: userId,
                productId: productId,
            },
        });
        if (!cartItem) {
            res.status(404).json({ error: "Cart item not found" });
            return;
        }
        // Retrieve product price from the Product model
        const productPrice = yield product_1.Product.findByPk(productId, {
            attributes: ["price"],
        });
        if (!productPrice) {
            throw new Error(`Product with ID ${productId} not found.`);
        }
        // Update the quantity and price of the cart item
        cartItem.dataValues.quantity = req.body.quantity;
        cartItem.dataValues.price =
            req.body.quantity * productPrice.dataValues.price;
        const update = cart_1.Cart.update({ quantity }, { where: { productId: productId } });
        // Save the updated cart item
        yield cartItem.save();
        res.json({ message: "Cart item updated successfully", cartItem });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});
CartController.deleteCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const userId = req.body.id;
        // Retrieve the cart item to be edited
        const cartItem = yield cart_1.Cart.findOne({
            where: {
                userId: userId,
                productId: productId,
            },
        });
        if (!cartItem) {
            res.status(404).json({ error: "Cart item not found" });
            return;
        }
        const deleteCartItem = yield cart_1.Cart.destroy({
            where: { productId: productId },
        });
        res.json({ message: "Cart item deletd successfully", deleteCartItem });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});
exports.default = CartController;
