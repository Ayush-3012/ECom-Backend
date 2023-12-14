import { Router } from "express";
import { createCatalog, orderList } from "../controllers/seller.controller.js";
import { verifyToken } from "../utils/token-manager.js";

const sellerRouter = Router();

sellerRouter.route("/create-catalog").post(verifyToken, createCatalog);
sellerRouter.route("/orders").get(verifyToken, orderList);

export default sellerRouter;
