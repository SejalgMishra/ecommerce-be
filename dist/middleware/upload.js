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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadSingleFile = exports.ALLOWED_IMAGE_TYPE = exports.UPLOAD_TYPES = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
var UPLOAD_TYPES;
(function (UPLOAD_TYPES) {
    UPLOAD_TYPES[UPLOAD_TYPES["IMAGE"] = 0] = "IMAGE";
})(UPLOAD_TYPES || (exports.UPLOAD_TYPES = UPLOAD_TYPES = {}));
exports.ALLOWED_IMAGE_TYPE = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/jfif",
];
cloudinary_1.default.v2.config({
    cloud_name: "dtewpc4wr",
    api_key: "688382598389416",
    api_secret: "YVuF9Ep8g9jeWb2EdCyl6O2mN5c",
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default.v2,
});
const validFileTypes = (type) => {
    if (type === UPLOAD_TYPES.IMAGE) {
        return exports.ALLOWED_IMAGE_TYPE;
    }
    return [];
};
const UploadSingleFile = (type, name) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const upload = configuredMulter(type).single("productimage");
    upload(req, res, (error) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            return res.send({
                status: false,
                message: (error === null || error === void 0 ? void 0 : error.message) || "Something went wrong while uploading asset",
            });
        }
        // const productId = res
        // console.log(res);
        let file = req.file;
        // console.log(file);
        // const productId = file.url
        try {
            // Upload the file to Cloudinary
            let result = yield cloudinary_1.default.v2.uploader.upload(file === null || file === void 0 ? void 0 : file.path, {
                folder: "e-commerce",
                resource_type: "image",
                upload_preset: "tinrlxj5",
            });
            console.log(result, "result");
            req.url = result.url;
            next();
        }
        catch (error) {
            console.log(error);
            return res.send({
                status: false,
                error
            });
        }
    }));
});
exports.UploadSingleFile = UploadSingleFile;
/**
 * a configured multer instance
 * @param type
 * @returns
 */
const configuredMulter = (type) => {
    return (0, multer_1.default)({
        dest: "public",
        limits: {
            fileSize: 1024 * 1024 * 5,
        },
    });
};
