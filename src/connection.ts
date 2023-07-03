import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  host: "localhost",
  database: "e-commerce",
  password: "123456",
  username: "root",
  port: 3306,
  dialect: "mysql",
  logging : false,
});

export const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};


export default sequelize;
