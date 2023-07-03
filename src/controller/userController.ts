import { Op } from "sequelize";
import { User } from "../models/user";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { userValidation } from "../request/userValidation";
import nodemailer from "nodemailer";

class userController {
  static getOneUserDetail = async (req: Request, res: Response) => {
    const userId = req.body.id;
    try {
      const details = await User.findAll({
        where: {
          id: userId,
        },
      });
      console.log(details);

      res.json(details);
    } catch (error) {
      console.log(error);
    }
  };
  static getUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  static register = async (req: Request, res: Response) => {
    const { username, password, email, token, confirm_password, role } =
      req.body;
    try {
      const checkData = await User.findAll({
        where: {
          [Op.or]: {
            username: req.body.username,
            email: req.body.email,
          },
        },
      });
      if (checkData.length > 0) {
        return res
          .status(400)
          .json({ msg: "username and email alredy exists" });
      }
      const myEnPassword = await bcrypt.hash(password, 10);

      if (password !== confirm_password) {
        return res.status(400).json({ msg: "password are not matched" });
      }

      const validation = await userValidation.validate({
        username,
        email,
        password: myEnPassword,
        confirm_password: myEnPassword,
        token: email + password,
        role,
      });
      console.log("validation", validation);

      const users = await User.create({
        username,
        email,
        password: myEnPassword,
        confirm_password: myEnPassword,
        role,
      });
      console.log(users.dataValues.id);

      // my response
      const userData = {
        username: users.dataValues.username,
        email: users.dataValues.email,
        userId: users.dataValues.id,
        token: users.dataValues.token,
        role: users.dataValues.role,
      };

      const token = jsonwebtoken.sign(
        { id: users.dataValues.id, role: users.dataValues.role },
        "1234" //secret
      );

      users.dataValues.token = token;
      users.dataValues.password = undefined;
      users.dataValues.confirm_password = undefined;

      res.send({ userData, token });
    } catch (error) {
      res.status(500).json(error);
    }
  };

  static LoginData = async (req: Request, res: Response) => {
    const { email, password, role } = req.body;
    console.log(req.body);

    try {
      const LoginData = await User.findOne({
        // attributes: ["id", "email", "password","username"],
        where: {
          email,
        },
      });

      if (!LoginData) {
        return res.status(400).json({ msg: "email not found" });
      }

      const myPassword = await bcrypt.compare(
        password,
        LoginData?.dataValues.password
      );

      if (!myPassword) {
        res.status(400).send("Invalid Password");
        return;
      }

      if (LoginData && myPassword) {
        const token = jsonwebtoken.sign(
          { id: LoginData.dataValues.id, role: LoginData.dataValues.role },
          "1234" //secret
        );

        LoginData.dataValues.token = token;
        const login = {
          username: LoginData.dataValues.username,
          id: LoginData.dataValues.id,
          token: LoginData.dataValues.token,
        };
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        res.status(200).cookie("token", token, options).json({
          success: true,
          login,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };

  static authUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    console.log(req.body);
    const LoginData = await User.findOne({
      where: {
        email,
      },
    });
    if (!LoginData) {
      res.send("Invalid Email");
    }

    res.send("Welcome to Dashboard");
  };

  static userDetails = async (req: Request, res: Response) => {
    const { phonenum, city, address, country, zipCode } = req.body;
    const userId = req.body.id;
    try {
      const findUser = await User.findOne({
        where: {
          id: userId,
        },
      });

      const details = await User.update(
        {
          phonenum,
          city,
          address,
          country,
          zipCode,
        },
        {
          where: {
            id: userId,
          },
        }
      );
      res.send(details);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  static deleteUser = async (req: Request, res: Response) => {
    try {
      await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.json(`deleted ${req.params.id}`);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  static updateUsers = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    try {
      const checkData = await User.findAll({
        where: {
          id: req.params.id,
        },
      });
      if (checkData.length > 0) {
        const users = await User.update(
          { username, password, email },
          {
            where: {
              id: req.params.id,
            },
          }
        );
        res.json({
          msg: "updated Succesfully",
          data: { username, password, email },
        });
      } else {
        res.json("no data founded");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

  static forgetPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
      const oldUser = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
      }
      //make secreat
      const secret = "1234" + oldUser.dataValues.password;
      // token
      const token = jsonwebtoken.sign(
        { email: oldUser.dataValues.email, id: oldUser.dataValues.id },
        secret
      );
      // link which send to the user
      const link = `http://localhost:3002/reset-password/${oldUser.dataValues.id}/${token}`;
      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        secure: true,
        auth: {
          user: "sammish9825@gmail.com",
          pass: "logiqbqawysrfhez",
        },
      });

      var mailOptions: any = {
        from: "sammish9825@gmail.com",
        to: email,
        subject: "Sending Email using Node.js",
        template: "email",
        text: link,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.json(info);
        }
      });
      res.json({ msg: "email send succesfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  };

  static resetPassword = async (req: Request, res: Response) => {
    const { id, token } = req.params;
    console.log(req.params);
    const oldUser = await User.findOne({
      where: {
        id: id,
      },
    });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = "1234" + oldUser.dataValues.password;
    try {
      const verify: any = jsonwebtoken.verify(token, secret);

      res.render("index", { email: verify.email, status: "Not Verified" });
    } catch (error) {
      console.log(error);
      res.send("Not Verified");
    }
  };

  static postResetPassword = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { password } = req.body;
    const decodedToken = req.body.token;
    const oldUser = await User.findOne({
      where: {
        id: id,
      },
    });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = "1234" + oldUser.dataValues.password;
    try {
      const verify: any = jsonwebtoken.verify(decodedToken, secret);
      const encryptedPassword = await bcrypt.hash(password, 10);
      await User.update(
        {
          password: encryptedPassword,
        },
        {
          where: { id: id },
        }
      );

      res.render("index", { email: verify.email, status: "Not Verified" });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };
}

export default userController;
