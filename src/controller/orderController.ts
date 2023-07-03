import { Order } from "../models/order";

import { Request, Response } from "express";
import { Product } from "../models/product";
import { orderValidation } from "../request/orderValidation";
import { User } from "../models/user";
import { Cart } from "../models/cart";
import Razorpay from "razorpay";

var instance = new Razorpay({
  key_id: "rzp_test_Ls1Ugr8RHpdrw2",
  key_secret: "482rN744FqAi8h0tLUD2adyd",
});

class orderController {
  static createOrder = async (req: Request, res: Response) => {
    const {
      address,
      mobile,
      paymentMethod,
      paymentId,
      price,
      creditCard,
      cvv,
      upiId,
    } = req.body;

    const userId = req.body.id;
    let totalPrice = 0;

    try {
      // Find cart
      const cartProduct = await Cart.findAll({ where: { userId: userId } });
      console.log(cartProduct);
      

      if (!cartProduct) {
        res.status(404).json({ error: "Cart is empty" });
        return;
      }

      // Extract product details from cart items
      const products = cartProduct.map((cartProduct) => {
        const { productId, quantity, price } = cartProduct.dataValues;
        totalPrice += price;
        return {
          productId,
          quantity,
          price,
        };
      });

      // Create the order
      const order = await Order.create({
        userId,
        products,
        paymentMethod,
        price: totalPrice,
        paymentId: null,
        creditCard: null,
        cvv: null,
        upiId: null,
      });

      // Destroy cart items
      // await Cart.destroy({
      //   where: {
      //     userId,
      //   },
      // });

      if (paymentMethod === "COD") {
        // Cash on Delivery payment method
        res.json({
          message: "Order created successfully",
          order,
          products,
          totalPrice,
        });
      } else if (paymentMethod === "CARD") {
        // Card Payment method
        if (!creditCard || !cvv) {
          res.status(400).json({ error: "Credit card details missing" });
          return;
        }
        // Save the payment ID in the order model
        order.setDataValue("paymentId", paymentId);
        order.dataValues.paymentId = paymentId;

        // Save the credit card and CVV in the order model
        order.setDataValue("creditCard", creditCard);
        order.dataValues.creditCard = creditCard;
        order.setDataValue("cvv", cvv);
        order.dataValues.cvv = cvv;

        await order.save();

        res.json({
          message: "Order created successfully",
          order,
          products,
          totalPrice,
          paymentId,
        });
      } else if (paymentMethod === "ONLINE") {
        // Online Payment method (Razorpay)
        const razorpayOrder = await instance.orders.create({
          amount: totalPrice * 100 ,
          currency: "INR",
          receipt: paymentId,
        });

        // Save the payment ID in the order model
        const payment = razorpayOrder.id;
        order.setDataValue("paymentId", payment);
        order.dataValues.paymentId = payment;

        await order.save();

        res.json({
          message: "Order created successfully",
          order,
          products,
          totalPrice,
          paymentId: payment,
          receipt: order.dataValues.id
        });
      } else {
        res.status(400).json({ error: "Invalid payment method" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  static cardDetail = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
      
      const order = await instance.payments.fetch(id);
      console.log(order);
      
      if (!order) return res.status(500).send("something occured");

      res.status(200).json({ success: true, data: order });
    } catch (err) {
      console.log(err);
    }
  };

  static getOrder = async (req: Request, res: Response): Promise<void> => {
    const userId = req.body.id;

    try {
      // Create the order
      const order = await Order.findAll({
        where: { userId: userId },
      });

      res.json({ order });
    } catch (error) {
      console.log(error);
    }
  };

  static getOrderUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const order = await Order.findAll({
        include: [
          {
            model: Product,
            as: "products",
            attributes: ["id", "name", "price", "productimage"],
          },
        ],
        where: { userId: id },
      });

      if (order) {
        const user = await User.findOne({
          where: { id },
        });
        res.json({ users: user, orders: order });
      }
    } catch (error) {
      console.log(error);
    }
  };

  static makePayment = async (req: Request, res: Response) => {
    try {
      const { orderId, userId } = req.body;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const order = await Order.findByPk(orderId);

      console.log(order, ";;;;;;;;order");

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      await order.save();

      return res
        .status(200)
        .json({ success: true, message: "Payment successful" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  };
}

export { orderController };
