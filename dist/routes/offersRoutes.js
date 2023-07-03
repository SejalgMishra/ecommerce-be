"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const offersController_1 = require("../controller/offersController");
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/user/offers", offersController_1.offerController.getAllofffer);
router.post("/admin/offers", auth_1.authMiddleware, offersController_1.offerController.createOffer);
router.patch("/admin/offers/:id", auth_1.authMiddleware, offersController_1.offerController.updateOffer);
router.delete("/admin/offers/:id", auth_1.authMiddleware, offersController_1.offerController.deleteOffer);
exports.default = router;
