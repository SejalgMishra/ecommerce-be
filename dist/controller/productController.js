"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const product_1 = require("../models/product");
const productValidation_1 = require("../request/productValidation");
class productController {
}
_a = productController;
productController.getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.Product.findAll({
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
    }
    catch (error) {
        res.status(500).json(error);
    }
});
productController.getOneProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const products = yield product_1.Product.findOne({
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
        }
        else {
            res.json({ msg: "no product found" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
productController.addProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, rating, categoryId, stock, offerId, imageId, } = req.body;
    let filename = null;
    if (req.file) {
        filename = req.file;
    }
    // console.log(req.file.url ,"file data");
    try {
        const validation = yield productValidation_1.productValidation.validate({
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
        const products = yield product_1.Product.create({
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
    }
    catch (error) {
        res.status(500).json(error);
    }
});
productController.updateProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, rating, category, stock, offers } = req.body;
    try {
        const checkData = yield product_1.Product.findAll({
            where: {
                id: req.params.id,
            },
        });
        if (checkData) {
            const products = yield product_1.Product.update({
                name,
                description,
                price,
                rating,
                category,
                stock,
                offers,
                productimage: req.url,
            }, {
                where: {
                    id: req.params.id,
                },
            });
            res.json({
                msg: "updated Succesfully",
                products,
            });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
productController.deleteProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkData = yield product_1.Product.findAll({
            where: {
                id: req.params.id,
            },
        });
        if (checkData) {
            yield product_1.Product.destroy({
                where: {
                    id: req.params.id,
                },
            });
            res.json({
                msg: "deleted Succesfully",
            });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
productController.serchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    try {
        const products = yield product_1.Product.findAll({
            attributes: ["name", "id", "productimage", "rating", "price"],
            where: {
                name: {
                    [sequelize_1.Op.like]: `%${name}%`,
                },
            },
        });
        console.log(products);
        res.json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = productController;
