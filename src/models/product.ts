import { DataTypes } from "sequelize";

import sequelize from "../connection";
import { Category } from "./category";
import { Order } from "./order";

const Product = sequelize.define(
  "Products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: "name",
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    productimage: {
      type: DataTypes.STRING,
    },
    offerId: {
      type: DataTypes.INTEGER,
    },
    rating: {
      type: DataTypes.TINYINT,
    },

    userId: {
      type: DataTypes.STRING,
      onDelete: "CASCADE",
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: "category_id",
    },
  },
);


// Product.belongsTo(Category, {
//   foreignKey: "categoryId",
//   as: "category",
// });

export { sequelize, Product };
