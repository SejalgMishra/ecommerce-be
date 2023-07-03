import { DataTypes } from "sequelize";

import sequelize from "../connection";
import { Order } from "./order";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  confirm_password: {
    type: DataTypes.STRING,
  },
  token: {
    type: DataTypes.STRING,
  },
  phonenum: {
    type: DataTypes.FLOAT,
  },
  city: {
    type: DataTypes.STRING,
  },

  address: {
    type: DataTypes.STRING,
  },

  country: {
    type: DataTypes.STRING,
  },

  zipCode: {
    type: DataTypes.STRING,
    field: "zip_code",
  },
  role : {
    type : DataTypes.ENUM('ADMIN' , 'USER') ,
    defaultValue : 'USER'
    
  }
});

// User.hasMany(Order, {
//   foreignKey: "userId",
// });

// User.hasMany(Order, { foreignKey: "orderId" });

User.sync();

export { sequelize, User };
