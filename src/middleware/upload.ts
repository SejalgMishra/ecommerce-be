import { NextFunction, Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Product } from "../models/product";

export enum UPLOAD_TYPES {
  IMAGE,
}

export const ALLOWED_IMAGE_TYPE = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/jfif",
];

cloudinary.v2.config({
  cloud_name: "dtewpc4wr",
  api_key: "688382598389416",
  api_secret: "YVuF9Ep8g9jeWb2EdCyl6O2mN5c",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
});

const validFileTypes = (type: UPLOAD_TYPES) => {
  if (type === UPLOAD_TYPES.IMAGE) {
    return ALLOWED_IMAGE_TYPE;
  }
  return [];
};

export const UploadSingleFile =
  (type: UPLOAD_TYPES, name: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const upload = configuredMulter(type).single("productimage");

    upload(req, res, async (error) => {
      if (error) {
        return res.send({
          status: false,
          message:
            error?.message || "Something went wrong while uploading asset",
        });
      }
      // const productId = res
      // console.log(res);

      let file: any = req.file;
      // console.log(file);

      // const productId = file.url

      try {
        // Upload the file to Cloudinary
        let result = await cloudinary.v2.uploader.upload(file?.path, {
          folder: "e-commerce",
          resource_type: "image",
          upload_preset: "tinrlxj5",
        });
        console.log(result, "result");
        req.url = result.url;

        next();
      } catch (error) {
        console.log(error);
        return res.send({
          status: false,
          error
        });
      }
    });
  };



/**
 * a configured multer instance
 * @param type
 * @returns
 */

const configuredMulter = (type: UPLOAD_TYPES) => {
  return multer({
    dest: "public",
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
  });
};
