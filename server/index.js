import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

import { register } from "./controllers/auth.js";
import { verifyToken } from "./middlewares/authorization.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import { createPost } from "./controllers/post.js";

/*Configurations*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy());
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assests")));

/*File storage*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/*Routes*/

app.post("/auth/register", upload.single("picture"), register);

app.use("/auth", authRoutes);
app.use("/users", verifyToken, userRoutes);

app.post("/posts", verifyToken, upload.single("picture"), createPost);
app.use("/posts", verifyToken, postRoutes);

/*Mongoose setup*/
const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Mongoose did not start due to : ${err}`);
  });
