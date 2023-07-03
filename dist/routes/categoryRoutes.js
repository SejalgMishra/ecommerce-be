"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controller/categoryController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/admin/categories", auth_1.authMiddleware, categoryController_1.categoryController.createCategory);
router.patch("/admin/categories/:id", auth_1.authMiddleware, categoryController_1.categoryController.updateCategories);
router.delete("/admin/categories/:id", auth_1.authMiddleware, categoryController_1.categoryController.deleteCategories);
router.get("/user/categories", categoryController_1.categoryController.getAllCategories);
router.get("/user/categories/:id", categoryController_1.categoryController.getOneCategories);
exports.default = router;
