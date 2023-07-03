import express from "express";
import productController from "../controller/productController";
import { UPLOAD_TYPES, UploadSingleFile } from "../middleware/upload";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.get("/user/product", productController.getAllProducts);

router.get("/user/product/:id", productController.getOneProducts);

router.get("/search", productController.serchProducts);


router.post(
  "/admin/product",
  authMiddleware,
  UploadSingleFile(UPLOAD_TYPES.IMAGE, "prodcutimage"),
  productController.addProducts
);

router.patch(
  "/admin/product/:id",
  authMiddleware,
  productController.updateProducts
);

router.delete(
  "/admin/product/:id",
  authMiddleware,
  productController.deleteProducts
)

export default router;
