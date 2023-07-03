import { orderController  } from "../controller/orderController"
import express from "express"
import payment from "../middleware/payment"
import { userAuth } from "../middleware/userAuth"

const router = express.Router()

 router.get("/order" ,userAuth ,  orderController.getOrder)

router.post("/order" ,userAuth, orderController.createOrder)

router.post("/orderDetails" , orderController.cardDetail)


// router.post("/cart" , orderController.addToCart)

// router.get("/cart/:userId" , orderController.getUserCart)



 router.get("/admin/order/:id" , orderController.getOrderUser)

 router.post("/user/payment" , payment)

//  router.post("/user/payment" , orderController.makePayment)





export default router;
