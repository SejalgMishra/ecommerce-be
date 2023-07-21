"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../controller/productController"));
const upload_1 = require("../middleware/upload");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/user/product", productController_1.default.getAllProducts);
router.get("/user/product/:id", productController_1.default.getOneProducts);
router.get("/search", productController_1.default.serchProducts);
router.post("/admin/product", auth_1.authMiddleware, (0, upload_1.UploadSingleFile)(upload_1.UPLOAD_TYPES.IMAGE, "prodcutimage"), productController_1.default.addProducts);
router.patch("/admin/product/:id", productController_1.default.updateProducts);
router.delete("/admin/product/:id", auth_1.authMiddleware, productController_1.default.deleteProducts);
exports.default = router;
