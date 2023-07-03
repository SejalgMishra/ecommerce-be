import { DataTypes } from "sequelize";

import sequelize from "../connection";
import { Product } from "./product";

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      field: "updated_at",
    },
  },
  {
    timestamps: false,
    tableName: "categories",
  }
);

Category.hasMany(Product, {
  foreignKey: "categoryId",
  as: "products",
});

Category.sync();

export { sequelize, Category };
