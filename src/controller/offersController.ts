import { Offers } from "../models/offers";
import { Request, Response } from "express";
import { Product } from "../models/product";
import { offerValidation } from "../request/offerValidation";

class offerController {
  // get all offers
  static getAllofffer = async (req: Request, res: Response) => {
    try {
      const allOffer = await Offers.findAll({
        include: [
          {
            model: Product,
            as: "products",
            attributes: ["id", "name"],
          },
        ],
      });
      res.json(allOffer);
      console.log(res.json(allOffer));
    } catch (error) {
      console.log(error);
    }
  };
 // create offer
  static createOffer = async (req: Request, res: Response) => {
    const { discoutPercentage, offername, startdate, enddate } = req.body;
    const date = Date.now();
    try {
      const validate = await offerValidation.validate({
        discoutPercentage,
        offername,
        startdate,
        enddate,
      });
      console.log(validate);

      const addOffer = await Offers.create({
        discoutPercentage,
        offername,
        startdate,
        enddate,
      });
      res.json(addOffer);
    } catch (error) {
      console.log(error);
    }
  };
// update offer
  static updateOffer = async (req: Request, res: Response) => {
    const { discoutPercentage, offername, startdate, enddate } = req.body;
    const { id } = req.params;
    const date = Date.now();
    try {
      const validate = await offerValidation.validate({
        discoutPercentage,
        offername,
        startdate,
        enddate,
      });
      console.log(validate);

      await Offers.update(
        {
          discoutPercentage,
          offername,
          startdate,
          enddate,
        },
        {
          where: { id: id },
        }
      );
      res.json({
        msg: "updated offer",
        data: { discoutPercentage, offername, startdate, enddate },
      });
    } catch (error) {
      console.log(error);
    }
  };
// deleteoffer
  static deleteOffer = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await Offers.destroy({
        where: { id: id },
      });
      res.json({
        msg: "deleted offer",
      });
    } catch (error) {
      console.log(error);
    }
  };

}

export { offerController };
