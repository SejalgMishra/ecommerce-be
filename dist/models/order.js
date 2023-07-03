"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
exports.sequelize = connection_1.default;
const product_1 = require("./product");
const user_1 = require("./user");
const Order = connection_1.default.define("Order", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    mobile: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    paymentMethod: {
        type: sequelize_1.DataTypes.ENUM("COD", "ONLINE", "CARD"),
    },
    paymentId: {
        type: sequelize_1.DataTypes.STRING,
    },
    creditCard: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    cvv: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    upiId: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.Order = Order;
Order.hasMany(product_1.Product, {
    as: "products",
    foreignKey: "id",
    onDelete: "cascade",
    onUpdate: "cascade",
});
Order.belongsTo(product_1.Product, {
    foreignKey: "productId",
    as: "product",
});
Order.hasOne(user_1.User, {
    as: "users", foreignKey: 'userId'
});
