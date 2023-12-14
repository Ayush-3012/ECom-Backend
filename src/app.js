import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import buyerRouter from "./routes/buyers.routes.js";
import sellerRouter from "./routes/sellers.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => res.json("Hello Welcome"));

app.use("/api/auth", userRouter);
app.use("/api/buyer", buyerRouter);
app.use("/api/seller", sellerRouter);

export default app;
