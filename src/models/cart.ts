import { DataTypes } from "sequelize";
import sequelize from "../connection";
import { Product } from "./product";
import { User } from "./user";

const Cart = sequelize.define("Carts", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  productId: {
    type: DataTypes.INTEGER,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  totalPrice: {
    type: DataTypes.INTEGER
}
});

Cart.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Cart.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product',
  });

export { sequelize, Cart };
