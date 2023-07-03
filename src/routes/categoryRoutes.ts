import express from "express";
import { categoryController } from "../controller/categoryController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.post("/admin/categories", authMiddleware, categoryController.createCategory);

router.patch("/admin/categories/:id", authMiddleware, categoryController.updateCategories);

router.delete("/admin/categories/:id", authMiddleware, categoryController.deleteCategories);



router.get("/user/categories", categoryController.getAllCategories);

router.get("/user/categories/:id", categoryController.getOneCategories);


export default router;
