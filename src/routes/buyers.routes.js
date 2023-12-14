import { Router } from "express";
import { createOrder, listSellers, sellerCatalog } from "../controllers/buyer.controller.js";

const buyerRouter = Router();

buyerRouter.route("/list-of-sellers").get(listSellers);
buyerRouter.route("/seller-catalog/:seller_id").get(sellerCatalog);
buyerRouter.route("/create-order/:seller_id").post(createOrder);

export default buyerRouter;
