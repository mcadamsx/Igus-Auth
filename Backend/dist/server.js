"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var dotenv = require("dotenv");
var dataSoruce_1 = require("./config/dataSoruce");
var authRoutes_1 = require("./routes/authRoutes");
require("reflect-metadata");
dotenv.config();
var app = express();
var cors = require('cors');
app.use(express.json());
app.use(cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// Routes
app.use("/api/auth", authRoutes_1.default);
// Database and Server Initialization
dataSoruce_1.AppDataSource.initialize()
    .then(function () {
    console.log("Database connected");
    app.listen(process.env.PORT, function () { return console.log("Server running on port ".concat(process.env.PORT)); });
})
    .catch(function (err) { return console.error("Database connection error", err); });
