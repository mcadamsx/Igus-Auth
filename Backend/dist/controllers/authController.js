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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.requestPasswordReset = exports.login = exports.register = exports.SECRET_KEY = void 0;
var bcrypt = require("bcrypt");
var dataSoruce_1 = require("../config/dataSoruce");
var generateToken_1 = require("../utils/generateToken");
var User_1 = require("../entities/User");
var jwt = require("jsonwebtoken");
exports.SECRET_KEY = process.env.JWT_SECRET;
var register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, role, repository, user, hashedPassword, newUser, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, email = _a.email, password = _a.password, role = _a.role;
                if (!email || !password) {
                    res.status(400).json({ message: "Email and password are required" });
                    return [2 /*return*/];
                }
                repository = dataSoruce_1.AppDataSource.getRepository(User_1.UserData);
                return [4 /*yield*/, repository.createQueryBuilder("user")
                        .where("user.email = :email", { email: email })
                        .getOne()];
            case 1:
                user = _b.sent();
                if (user) {
                    res.status(400).json({ message: "User with email ".concat(email, " already exists") });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 2:
                hashedPassword = _b.sent();
                newUser = repository.create({
                    email: email,
                    password: hashedPassword,
                    role: role,
                    createdAt: new Date(),
                });
                return [4 /*yield*/, repository.save(newUser)];
            case 3:
                _b.sent();
                res.status(201).json({
                    message: "User registered successfully",
                    user: {
                        id: newUser.id,
                        email: newUser.email,
                        role: newUser.role,
                        createdAt: newUser.createdAt,
                    },
                });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                console.error("Error during registration:", err_1);
                next(err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, repository, user, isPasswordMatch, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    res.status(400).json({ message: "Email and password are required" });
                    return [2 /*return*/];
                }
                repository = dataSoruce_1.AppDataSource.getRepository(User_1.UserData);
                return [4 /*yield*/, repository.findOne({ where: { email: email } })];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.status(400).json({ message: "Invalid Credentials" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 2:
                isPasswordMatch = _b.sent();
                if (!isPasswordMatch) {
                    res.status(400).json({ message: "Invalid Password" });
                    return [2 /*return*/];
                }
                token = (0, generateToken_1.generateToken)(user.id, user.role);
                res.status(200).json({
                    message: "Login successful",
                    user: {
                        id: user.id,
                        email: user.email,
                        role: user.role,
                    },
                    token: token,
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error("Error during login:", error_1);
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var requestPasswordReset = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, repository, user, resetToken, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                email = req.body.email;
                if (!email) {
                    res.status(400).json({ message: "Email is required" });
                    return [2 /*return*/];
                }
                repository = dataSoruce_1.AppDataSource.getRepository(User_1.UserData);
                return [4 /*yield*/, repository.findOne({ where: { email: email } })];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(404).json({ message: "User with the given email does not exist" });
                    return [2 /*return*/];
                }
                resetToken = (0, generateToken_1.generateToken)(user.id, user.role);
                user.resetPasswordToken = resetToken;
                user.resetPasswordExpires = new Date(Date.now() + 3600000);
                return [4 /*yield*/, repository.save(user)];
            case 2:
                _a.sent();
                res.status(200).json({
                    message: "Password reset sucessful",
                    resetToken: resetToken,
                });
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.error("Error requesting password reset:", err_2);
                next(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.requestPasswordReset = requestPasswordReset;
var resetPassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, token, newPassword, repository, decodedToken, user, hashedPassword, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, token = _a.token, newPassword = _a.newPassword;
                if (!token || !newPassword) {
                    res.status(400).json({ message: "Token and new password are required." });
                    return [2 /*return*/];
                }
                repository = dataSoruce_1.AppDataSource.getRepository(User_1.UserData);
                decodedToken = void 0;
                try {
                    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                }
                catch (err) {
                    res.status(400).json({ message: "Invalid or expired reset token." });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, repository.findOne({ where: { id: decodedToken.id } })];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.status(404).json({ message: "User not found." });
                    return [2 /*return*/];
                }
                if (user.resetPasswordExpires && new Date(user.resetPasswordExpires) < new Date()) {
                    res.status(400).json({ message: "Reset token has expired." });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcrypt.hash(newPassword, 10)];
            case 2:
                hashedPassword = _b.sent();
                console.log("New hashed password:", hashedPassword); // Check this in the logs
                // Update user properties
                user.password = hashedPassword;
                user.resetPasswordToken = null;
                user.resetPasswordExpires = null;
                // Persist the updated user
                return [4 /*yield*/, repository.save(user)];
            case 3:
                // Persist the updated user
                _b.sent();
                res.status(200).json({
                    message: "Password reset successfully.",
                });
                return [3 /*break*/, 5];
            case 4:
                err_3 = _b.sent();
                console.error("Error resetting password:", err_3);
                next(err_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.resetPassword = resetPassword;
