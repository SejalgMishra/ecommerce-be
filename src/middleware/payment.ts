import { log } from "console";
import { Request, Response } from "express";
import Razorpay from "razorpay";

const payment = async (req: Request, res: Response) => {
  try {
    let { amount } = req.body;
    var instance = new Razorpay({
      key_id: "rzp_test_Ls1Ugr8RHpdrw2",
      key_secret: "482rN744FqAi8h0tLUD2adyd",
    });

    const order = await instance.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt#1",
    });

    res.send({ order, amount });
  } catch (error) {
    console.log(error);
  }
};

export default payment;
