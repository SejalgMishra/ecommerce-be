"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
exports.sequelize = connection_1.default;
const User = connection_1.default.define("User", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
    confirm_password: {
        type: sequelize_1.DataTypes.STRING,
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
    },
    phonenum: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
    },
    zipCode: {
        type: sequelize_1.DataTypes.STRING,
        field: "zip_code",
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('ADMIN', 'USER'),
        defaultValue: 'USER'
    }
});
exports.User = User;
// User.hasMany(Order, {
//   foreignKey: "userId",
// });
// User.hasMany(Order, { foreignKey: "orderId" });
User.sync();
