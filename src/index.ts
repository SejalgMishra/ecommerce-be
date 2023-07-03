import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import userRoute from "./routes/userRoutes";
import productRoute from "./routes/productRoutes";
import categoryRoute from "./routes/categoryRoutes";
import offerRoute from "./routes/offersRoutes";
import orderRoute from "./routes/orderRoutes";
import cartRoute from "./routes/cartRoutes";
import cors from "cors"


import cookieParser from "cookie-parser";
import sequelize, { connection } from "./connection";
import path from "path";

var app = express();
app.use(express.json())
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
// all users
app.use("/", userRoute);

//products
app.use("/", productRoute);


//categories
app.use("/", categoryRoute);


//offers
app.use("/", offerRoute);

//order
app.use("/", orderRoute);

//cart
app.use("/", cartRoute);



// sequelize.sync().then(() => {
  app.listen(3002, async () => {
    // await sequelize.drop();
    await connection();
    console.log("server started on port 3002");
  });
//  });

