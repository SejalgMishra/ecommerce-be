import { offerController } from "../controller/offersController"
import express from "express"
import { authMiddleware } from "../middleware/auth"

const router = express.Router()

router.get("/user/offers" , offerController.getAllofffer)

router.post("/admin/offers" ,authMiddleware , offerController.createOffer)

router.patch("/admin/offers/:id" ,authMiddleware , offerController.updateOffer)

router.delete("/admin/offers/:id" ,authMiddleware , offerController.deleteOffer)




export default router;
