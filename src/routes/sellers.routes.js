import { Router } from "express";
import { createCatalog, orderList } from "../controllers/seller.controller.js";

const sellerRouter = Router();

sellerRouter.route("/create-catalog").post(createCatalog);
sellerRouter.route("/orders").get(orderList);

export default sellerRouter;
