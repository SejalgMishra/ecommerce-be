import { DataType, DataTypes } from "sequelize";
import sequelize from "../connection";
import { Product } from "./product";

const Offers = sequelize.define("Offers", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  discoutPercentage: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  offername: {
    type: DataTypes.STRING,
  },
  startdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  enddate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Offers.hasMany(Product, {
  foreignKey: "offerId",
  as: "products",
  onDelete: "cascade",
  onUpdate: "cascade",
});

export { sequelize, Offers };
