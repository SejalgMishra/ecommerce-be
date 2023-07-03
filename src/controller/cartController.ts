// controllers/CartController.ts
import { Request, Response } from "express";
import { Cart } from "../models/cart";
import { Product } from "../models/product";

class CartController {
  static addToCart = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.body.id;
      const { products } = req.body;
  
      const cartItems = [];
      let totalPrice = 0;
      let productPrices = [];
      
  
      for (const product of products) {
        const { productId, quantity } = product;
  
        // Check if the product already exists in the cart for the user
        const existingCartItem = await Cart.findOne({
          where: {
            userId,
            productId,
          },
        });
  
        if (existingCartItem) {
          res.json({ message: "This product is already in your cart" });
          return;
        } else {
          // Retrieve product price from the Product model
          const productPrice = await Product.findByPk(productId, {
            attributes: ["price", "productimage", "name", "rating", "quantity" , "id"],
          });
  
          if (!productPrice) {
            throw new Error(`Product with ID ${productId} not found.`);
          }
  
          // Product price
          const price = productPrice.dataValues.price;
  
          // Multiply price with quantity to calculate the final price
          const productTotalPrice = quantity * price;
  
          // Add the product total price to the overall totalPrice
          totalPrice += productTotalPrice;
  
          // Create a new cart item
          const cartItem = {
            userId,
            productId,
            quantity,
            price: productTotalPrice,
          };
  
          cartItems.push(cartItem);
          productPrices.push({
            ...productPrice.dataValues,
            quantity,
          });
        }
        await Cart.bulkCreate(cartItems);
  
      res.json({
        message: "Products added to cart successfully",
        totalPrice,
        productPrice: productPrices,
        productId
      });
      }
  
      // Bulk create cart items
      
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  };

  static getCart = async (req: Request, res: Response): Promise<void> => {
    const userId = req.body.id;

    try {
      if (userId) {
        const cartItems = await Cart.findAll({
          where: {
            userId: userId,
          },
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["name", "productimage"],
            },
          ],
        });

        const cartData = cartItems.map((cartItem) => {
          const { productId, quantity, price, product } = cartItem.dataValues;
          const { name, productimage } = product.dataValues;
          console.log(product, "products");

          return {
            productId,
            quantity,
            price,
            name,
            productimage,
          };
        });

        res.json(cartData);
      } else {
        res.json({ msg: "No user found" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  static editCartItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const { productId } = req.params;
      const userId = req.body.id;
      const { quantity } = req.body;

      // Retrieve the cart item to be edited
      const cartItem = await Cart.findOne({
        where: {
          userId: userId,
          productId: productId,
        },
      });
      // console.log(cartItem);

      if (!cartItem) {
        res.status(404).json({ error: "Cart item not found" });
        return;
      }

      // Retrieve product price from the Product model
      const productPrice = await Product.findByPk(productId, {
        attributes: ["price"],
      });

      if (!productPrice) {
        throw new Error(`Product with ID ${productId} not found.`);
      }

      // Update the quantity and price of the cart item
      cartItem.dataValues.quantity = req.body.quantity;
      cartItem.dataValues.price =
        req.body.quantity * productPrice.dataValues.price;

      const update = Cart.update(
        { quantity },
        { where: { productId: productId } }
      );
      // Save the updated cart item
      await cartItem.save();

      res.json({ message: "Cart item updated successfully", cartItem });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  };

  static deleteCartItem = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { productId } = req.params;
      const userId = req.body.id;
      // Retrieve the cart item to be edited
      const cartItem: any = await Cart.findOne({
        where: {
          userId: userId,
          productId: productId,
        },
      });

      if (!cartItem) {
        res.status(404).json({ error: "Cart item not found" });
        return;
      }

      const deleteCartItem = await Cart.destroy({
        where: { productId: productId },
      });

      res.json({ message: "Cart item deletd successfully", deleteCartItem });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  };
}

export default CartController;
