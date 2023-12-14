import { Router } from "express";
import { createOrder, listSellers, sellerCatalog } from "../controllers/buyer.controller.js";
import { verifyToken } from "../utils/token-manager.js";

const buyerRouter = Router();

buyerRouter.route("/list-of-sellers").get(verifyToken, listSellers);
buyerRouter.route("/seller-catalog/:seller_id").get(verifyToken, sellerCatalog);
buyerRouter.route("/create-order/:seller_id").post(verifyToken, createOrder);

export default buyerRouter;
