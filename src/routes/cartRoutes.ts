// routes/cartRoutes.ts
import express from 'express';
import CartController from '../controller/cartController';
import { userAuth } from '../middleware/userAuth';

const router = express.Router();

// Add products to cart
router.post('/cartItem',userAuth, CartController.addToCart);

// Get all cart items for a user
 router.get('/cartItem',userAuth, CartController.getCart);

 router.patch('/cartItem/:productId',userAuth, CartController.editCartItem);

 router.delete('/cartItem/:productId',userAuth, CartController.deleteCartItem);



export default router;
