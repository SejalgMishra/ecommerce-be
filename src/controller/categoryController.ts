import { Request, Response } from "express";
import { Category } from "../models/category";
import { Product } from "../models/product";
import { categoryValidation } from "../request/categoryValidation";

class categoryController {
  static createCategory = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { name, description } = req.body;

      const validate = await categoryValidation.validate({
        name,
        description,
      });

      const category = await Category.create({ name, description });

      res.status(201).json(category);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Failed to create category" });
    }
  };

  static getAllCategories = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const categories = await Category.findAll({
        include: [
          {
            model: Product,
            as: "products",
            attributes: ["id", "name"],
          },
        ],
      });

      res.json(categories);
    } catch (error) {
      console.error("Error retrieving categories:", error);
      res.status(500).json({ error: "Failed to retrieve categories" });
    }
  };

  static getOneCategories = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params
    try {
      const categories = await Category.findAll({
        include: [
          {
            model: Product,
            as: "products",
            attributes: ["id", "name"],
          },
        ],
        where : { id : id}
      });

      res.json(categories);
    } catch (error) {
      console.error("Error retrieving categories:", error);
      res.status(500).json({ error: "Failed to retrieve categories" });
    }
  };

  static updateCategories = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params
    const { name, description } = req.body

    try {
      const categories = await Category.findAll({
        include: [
          {
            model: Product,
            as: "products",
            attributes: ["id", "name"],
          },
        ],
        where : { id : id}
      });
      
      console.log(categories);
      
      if(categories){
        const updateCategories = await Category.update({
          name,
          description
        },{
          where : { id : id}
        })
        console.log(updateCategories ,"updateProduct");
        

      res.json({msg : "upadtaed" , data :{name , description}})
      }
    } catch (error) {
      console.error("Error retrieving categories:", error);
      res.status(500).json({ error: "Failed to retrieve categories" });
    }
  };

  static deleteCategories = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params

    try {
      const categories = await Category.findAll({
        include: [
          {
            model: Product,
            as: "products",
            attributes: ["id", "name"],
          },
        ],
        where : { id : id}
      });
      
      console.log(categories);
      
      if(categories){
        const deleteCategories= await Category.destroy({
          where : { id : id}
        })
        console.log(deleteCategories ,"updateProduct");
        

      res.json({msg : "deleted" })
      }
    } catch (error) {
      console.error("Error retrieving categories:", error);
      res.status(500).json({ error: "Failed to delete categories" });
    }
  };
}

export { categoryController };
