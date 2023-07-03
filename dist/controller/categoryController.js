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
exports.categoryController = void 0;
const category_1 = require("../models/category");
const product_1 = require("../models/product");
const categoryValidation_1 = require("../request/categoryValidation");
class categoryController {
}
exports.categoryController = categoryController;
_a = categoryController;
categoryController.createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const validate = yield categoryValidation_1.categoryValidation.validate({
            name,
            description,
        });
        const category = yield category_1.Category.create({ name, description });
        res.status(201).json(category);
    }
    catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Failed to create category" });
    }
});
categoryController.getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.Category.findAll({
            include: [
                {
                    model: product_1.Product,
                    as: "products",
                    attributes: ["id", "name"],
                },
            ],
        });
        res.json(categories);
    }
    catch (error) {
        console.error("Error retrieving categories:", error);
        res.status(500).json({ error: "Failed to retrieve categories" });
    }
});
categoryController.getOneCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const categories = yield category_1.Category.findAll({
            include: [
                {
                    model: product_1.Product,
                    as: "products",
                    attributes: ["id", "name"],
                },
            ],
            where: { id: id }
        });
        res.json(categories);
    }
    catch (error) {
        console.error("Error retrieving categories:", error);
        res.status(500).json({ error: "Failed to retrieve categories" });
    }
});
categoryController.updateCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const categories = yield category_1.Category.findAll({
            include: [
                {
                    model: product_1.Product,
                    as: "products",
                    attributes: ["id", "name"],
                },
            ],
            where: { id: id }
        });
        console.log(categories);
        if (categories) {
            const updateCategories = yield category_1.Category.update({
                name,
                description
            }, {
                where: { id: id }
            });
            console.log(updateCategories, "updateProduct");
            res.json({ msg: "upadtaed", data: { name, description } });
        }
    }
    catch (error) {
        console.error("Error retrieving categories:", error);
        res.status(500).json({ error: "Failed to retrieve categories" });
    }
});
categoryController.deleteCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const categories = yield category_1.Category.findAll({
            include: [
                {
                    model: product_1.Product,
                    as: "products",
                    attributes: ["id", "name"],
                },
            ],
            where: { id: id }
        });
        console.log(categories);
        if (categories) {
            const deleteCategories = yield category_1.Category.destroy({
                where: { id: id }
            });
            console.log(deleteCategories, "updateProduct");
            res.json({ msg: "deleted" });
        }
    }
    catch (error) {
        console.error("Error retrieving categories:", error);
        res.status(500).json({ error: "Failed to delete categories" });
    }
});
