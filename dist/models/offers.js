"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Offers = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
exports.sequelize = connection_1.default;
const product_1 = require("./product");
const Offers = connection_1.default.define("Offers", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    discoutPercentage: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    offername: {
        type: sequelize_1.DataTypes.STRING,
    },
    startdate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    enddate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
});
exports.Offers = Offers;
Offers.hasMany(product_1.Product, {
    foreignKey: "offerId",
    as: "products",
    onDelete: "cascade",
    onUpdate: "cascade",
});
