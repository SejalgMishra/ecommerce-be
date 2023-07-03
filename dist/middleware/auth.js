"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
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
        if (decodedToken.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Forbidden. Only admins are allowed to perform this action.' });
        }
        req.body.id = decodedToken.id;
        req.body.role = decodedToken.role;
        next();
    }
    catch (err) {
        return res.status(401).json(err);
    }
};
exports.authMiddleware = authMiddleware;
