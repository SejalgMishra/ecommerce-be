import { DataTypes } from "sequelize";

import sequelize from "../connection";
import { Product } from "./product";
import { User } from "./user";

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  productId: {
    type: DataTypes.INTEGER,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  mobile: {
    type: DataTypes.INTEGER,
  },
  address: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  paymentMethod: {
    type: DataTypes.ENUM("COD","ONLINE", "CARD"),
  },
  paymentId: {
    type: DataTypes.STRING,
  },
  creditCard : {
    type: DataTypes.INTEGER,
  },
  cvv : {
    type: DataTypes.INTEGER,
  },
  upiId : {
    type: DataTypes.STRING
  }
  
});

Order.hasMany(Product, {
  as: "products",
  foreignKey: "id",
  onDelete: "cascade",
  onUpdate: "cascade",
});

Order.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

Order.hasOne(User , {
  as:"users" ,foreignKey : 'userId'
})

// Order.hasMany(User , {
//     foreignKey : "userId",
//   as: "users"
// })

export { sequelize, Order };
