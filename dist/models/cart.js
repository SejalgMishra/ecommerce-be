"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
exports.sequelize = connection_1.default;
const product_1 = require("./product");
const user_1 = require("./user");
const Cart = connection_1.default.define("Carts", {
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    totalPrice: {
        type: sequelize_1.DataTypes.INTEGER
    }
});
exports.Cart = Cart;
Cart.belongsTo(user_1.User, {
    foreignKey: "userId",
    as: "user",
});
Cart.belongsTo(product_1.Product, {
    foreignKey: 'productId',
    as: 'product',
});
