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
exports.offerController = void 0;
const offers_1 = require("../models/offers");
const product_1 = require("../models/product");
const offerValidation_1 = require("../request/offerValidation");
class offerController {
}
exports.offerController = offerController;
_a = offerController;
// get all offers
offerController.getAllofffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allOffer = yield offers_1.Offers.findAll({
            include: [
                {
                    model: product_1.Product,
                    as: "products",
                    attributes: ["id", "name"],
                },
            ],
        });
        res.json(allOffer);
        console.log(res.json(allOffer));
    }
    catch (error) {
        console.log(error);
    }
});
// create offer
offerController.createOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { discoutPercentage, offername, startdate, enddate } = req.body;
    const date = Date.now();
    try {
        const validate = yield offerValidation_1.offerValidation.validate({
            discoutPercentage,
            offername,
            startdate,
            enddate,
        });
        console.log(validate);
        const addOffer = yield offers_1.Offers.create({
            discoutPercentage,
            offername,
            startdate,
            enddate,
        });
        res.json(addOffer);
    }
    catch (error) {
        console.log(error);
    }
});
// update offer
offerController.updateOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { discoutPercentage, offername, startdate, enddate } = req.body;
    const { id } = req.params;
    const date = Date.now();
    try {
        const validate = yield offerValidation_1.offerValidation.validate({
            discoutPercentage,
            offername,
            startdate,
            enddate,
        });
        console.log(validate);
        yield offers_1.Offers.update({
            discoutPercentage,
            offername,
            startdate,
            enddate,
        }, {
            where: { id: id },
        });
        res.json({
            msg: "updated offer",
            data: { discoutPercentage, offername, startdate, enddate },
        });
    }
    catch (error) {
        console.log(error);
    }
});
// deleteoffer
offerController.deleteOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield offers_1.Offers.destroy({
            where: { id: id },
        });
        res.json({
            msg: "deleted offer",
        });
    }
    catch (error) {
        console.log(error);
    }
});
