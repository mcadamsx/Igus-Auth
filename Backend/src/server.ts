import * as express from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./config/dataSoruce";
import authRoutes from "./routes/authRoutes";
import "reflect-metadata"


dotenv.config();

const app = express();
const cors = require('cors')
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/auth", authRoutes);

// Database and Server Initialization
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch((err) => console.error("Database connection error", err));
