import { Op } from "sequelize";
import { Product } from "../models/product";
import { Request, Response } from "express";
import { productValidation } from "../request/productValidation";
import { Category } from "../models/category";

class productController {
  static getAllProducts = async (req: Request, res: Response) => {
    try {
      const products = await Product.findAll({
        attributes: [
          "id",
          "name",
          "price",
          "rating",
          "offerId",
          "categoryId",
          "productimage",
        ],
        order: [
          ["createdAt", "DESC"],
          ["price", "DESC"],
        ],
      });
      res.json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  static getOneProducts = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const products = await Product.findOne({
        where: {
          id,
        },
      });
      /// my response
      if (products) {
        const productData = {
          id,
          name: products.dataValues.name,
          description: products.dataValues.description,
          price: products.dataValues.price,
          rating: products.dataValues.rating,
          categoryId: products.dataValues.categoryId,
          productimage: products.dataValues.productimage,
          stock: products.dataValues.stock,
          offerId: products.dataValues.offerId,
        };
        res.json(productData);
      } else {
        res.json({ msg: "no product found" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

  static addProducts = async (req: Request, res: Response) => {
    const {
      name,
      description,
      price,
      rating,
      categoryId,
      stock,
      offerId,
      imageId,
    } = req.body;
    let filename = null;
    if (req.file) {
      filename = req.file;
    }

    // console.log(req.file.url ,"file data");

    try {
      const validation = await productValidation.validate({
        name,
        description,
        price,
        rating,
        categoryId,
        productimage: req.url,
        stock,
        offerId,
      });
      //console.log("validation:", validation)

      const products = await Product.create({
        name,
        description,
        price,
        rating,
        categoryId,
        productimage: req.url,
        stock,
        offerId,
      });
      /// my response
      const productData = {
        name: products.dataValues.name,
        description: products.dataValues.description,
        price: products.dataValues.price,
        rating: products.dataValues.rating,
        categoryId: products.dataValues.categoryId,
        productimage: products.dataValues.productimage,
        stock: products.dataValues.stock,
        offerId: products.dataValues.offerId,
      };
      res.json({ productData });
    } catch (error) {
      res.status(500).json(error);
    }
  };

  static updateProducts = async (req: Request, res: Response) => {
    const { name, description, price, rating, category, stock, offers } =
      req.body;

    const filename = req.file;

    try {
      const checkData = await Product.findAll({
        where: {
          id: req.params.id,
        },
      });
      if (checkData) {
        const products = await Product.update(
          {
            name,
            description,
            price,
            rating,
            category,
            stock,
            offers,
            productimage: filename,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );

        res.json({
          msg: "updated Succesfully",
          products,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

  static deleteProducts = async (req: Request, res: Response) => {
    try {
      const checkData = await Product.findAll({
        where: {
          id: req.params.id,
        },
      });
      if (checkData) {
        await Product.destroy({
          where: {
            id: req.params.id,
          },
        });

        res.json({
          msg: "deleted Succesfully",
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

  static serchProducts = async (req: Request, res: Response) => {
    const { name } = req.query;

  try {
    const products = await Product.findAll({
      attributes : ["name" , "id" , "productimage"],
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    });
    console.log(products);
    
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
  };
}

export default productController;
