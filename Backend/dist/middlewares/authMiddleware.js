"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = void 0;
var jwt = require("jsonwebtoken");
var checkAdmin = function (req, res, next) {
    var _a;
    try {
        var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "No token provided" });
        }
        var decoded = jwt.decode(token);
        if (!decoded) {
            res.status(403).json({ message: "Invalid or expired token" });
        }
        console.log(token);
        console.log(decoded);
        if (decoded.userRole !== "Admin") {
            res.status(403).json({ message: "Access denied. Admins only." });
        }
        next();
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.checkAdmin = checkAdmin;
