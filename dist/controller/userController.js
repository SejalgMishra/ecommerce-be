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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userValidation_1 = require("../request/userValidation");
const nodemailer_1 = __importDefault(require("nodemailer"));
class userController {
}
_a = userController;
userController.getOneUserDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.id;
    try {
        const details = yield user_1.User.findAll({
            where: {
                id: userId,
            },
        });
        res.json(details);
    }
    catch (error) {
        console.log(error);
    }
});
userController.getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.findAll();
        res.json(users);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
userController.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email, token, confirm_password, role } = req.body;
    try {
        const checkData = yield user_1.User.findAll({
            where: {
                [sequelize_1.Op.or]: {
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
        const myEnPassword = yield bcryptjs_1.default.hash(password, 10);
        if (password !== confirm_password) {
            return res.status(400).json({ msg: "password are not matched" });
        }
        const validation = yield userValidation_1.userValidation.validate({
            username,
            email,
            password: myEnPassword,
            confirm_password: myEnPassword,
            token: email + password,
            role,
        });
        console.log("validation", validation);
        const users = yield user_1.User.create({
            username,
            email,
            password: myEnPassword,
            confirm_password: myEnPassword,
            role,
        });
        // my response
        const userData = {
            username: users.dataValues.username,
            email: users.dataValues.email,
            userId: users.dataValues.id,
            token: users.dataValues.token,
            role: users.dataValues.role,
        };
        const token = jsonwebtoken_1.default.sign({ id: users.dataValues.id, role: users.dataValues.role }, "1234" //secret
        );
        users.dataValues.token = token;
        users.dataValues.password = undefined;
        users.dataValues.confirm_password = undefined;
        res.send({ userData, token });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
userController.LoginData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = req.body;
    try {
        const LoginData = yield user_1.User.findOne({
            // attributes: ["id", "email", "password","username"],
            where: {
                email,
            },
        });
        if (!LoginData) {
            return res.status(400).json({ msg: "email not found" });
        }
        const myPassword = yield bcryptjs_1.default.compare(password, LoginData === null || LoginData === void 0 ? void 0 : LoginData.dataValues.password);
        if (!myPassword) {
            res.status(400).send("Invalid Password");
            return;
        }
        if (LoginData && myPassword) {
            const token = jsonwebtoken_1.default.sign({ id: LoginData.dataValues.id, role: LoginData.dataValues.role }, "1234" //secret
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
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
userController.authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const LoginData = yield user_1.User.findOne({
        where: {
            email,
        },
    });
    if (!LoginData) {
        res.send("Invalid Email");
    }
    res.send("Welcome to Dashboard");
});
userController.userDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phonenum, city, address, country, zipCode } = req.body;
    const userId = req.body.id;
    try {
        const findUser = yield user_1.User.findOne({
            where: {
                id: userId,
            },
        });
        const details = yield user_1.User.update({
            phonenum,
            city,
            address,
            country,
            zipCode,
        }, {
            where: {
                id: userId,
            },
        });
        res.send(details);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
userController.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.User.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.json(`deleted ${req.params.id}`);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
userController.updateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    try {
        const checkData = yield user_1.User.findAll({
            where: {
                id: req.params.id,
            },
        });
        if (checkData.length > 0) {
            const users = yield user_1.User.update({ username, password, email }, {
                where: {
                    id: req.params.id,
                },
            });
            res.json({
                msg: "updated Succesfully",
                data: { username, password, email },
                users
            });
        }
        else {
            res.json("no data founded");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
userController.forgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const oldUser = yield user_1.User.findOne({
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
        const token = jsonwebtoken_1.default.sign({ email: oldUser.dataValues.email, id: oldUser.dataValues.id }, secret);
        // link which send to the user
        const link = `http://localhost:3002/reset-password/${oldUser.dataValues.id}/${token}`;
        var transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            secure: true,
            auth: {
                user: "sammish9825@gmail.com",
                pass: "logiqbqawysrfhez",
            },
        });
        var mailOptions = {
            from: "sammish9825@gmail.com",
            to: email,
            subject: "Sending Email using Node.js",
            template: "email",
            text: link,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email sent: " + info.response);
                res.json(info);
            }
        });
        res.json({ msg: "email send succesfully" });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
userController.resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token } = req.params;
    console.log(req.params);
    const oldUser = yield user_1.User.findOne({
        where: {
            id: id,
        },
    });
    if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
    }
    const secret = "1234" + oldUser.dataValues.password;
    try {
        const verify = jsonwebtoken_1.default.verify(token, secret);
        res.render("index", { email: verify.email, status: "Not Verified" });
    }
    catch (error) {
        console.log(error);
        res.send("Not Verified");
    }
});
userController.postResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { password } = req.body;
    const decodedToken = req.body.token;
    const oldUser = yield user_1.User.findOne({
        where: {
            id: id,
        },
    });
    if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
    }
    const secret = "1234" + oldUser.dataValues.password;
    try {
        const verify = jsonwebtoken_1.default.verify(decodedToken, secret);
        const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        yield user_1.User.update({
            password: encryptedPassword,
        }, {
            where: { id: id },
        });
        res.render("index", { email: verify.email, status: "Not Verified" });
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});
exports.default = userController;
