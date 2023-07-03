"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAuth = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    console.log(authorizationHeader, "authorizationHeader");
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Authentication failed. Token missing.' });
    }
    const token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1];
    console.log(token);
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, '1234');
        console.log(decodedToken);
        if (!decodedToken) {
            res.send("authaticate first");
        }
        req.body.id = decodedToken.id;
        req.body.token = decodedToken;
        next();
    }
    catch (err) {
        return res.status(401).json(err);
    }
};
exports.userAuth = userAuth;
