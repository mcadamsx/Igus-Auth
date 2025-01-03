"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
var jwt = require("jsonwebtoken");
var generateToken = function (userId, userRole) {
    return jwt.sign({ userId: userId, userRole: userRole }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
exports.generateToken = generateToken;
