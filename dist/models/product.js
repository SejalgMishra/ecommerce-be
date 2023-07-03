"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
exports.sequelize = connection_1.default;
const Product = connection_1.default.define("Products", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "name",
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    productimage: {
        type: sequelize_1.DataTypes.STRING,
    },
    offerId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    rating: {
        type: sequelize_1.DataTypes.TINYINT,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        onDelete: "CASCADE",
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "category_id",
    },
});
exports.Product = Product;
