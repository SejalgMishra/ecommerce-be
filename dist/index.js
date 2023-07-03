"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const offersRoutes_1 = __importDefault(require("./routes/offersRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connection_1 = require("./connection");
const path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.set("view engine", "ejs");
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(express_1.default.urlencoded({ extended: false }));
// all users
app.use("/", userRoutes_1.default);
//products
app.use("/", productRoutes_1.default);
//categories
app.use("/", categoryRoutes_1.default);
//offers
app.use("/", offersRoutes_1.default);
//order
app.use("/", orderRoutes_1.default);
//cart
app.use("/", cartRoutes_1.default);
// sequelize.sync().then(() => {
app.listen(3002, () => __awaiter(void 0, void 0, void 0, function* () {
    // await sequelize.drop();
    yield (0, connection_1.connection)();
    console.log("server started on port 3002");
}));
//  });
