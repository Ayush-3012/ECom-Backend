import { User } from "../models/user.models.js";
import { Order } from "../models/order.models.js";
import { Catalog } from "../models/catalog.models.js";

const listSellers = async (req, res) => {
  try {
    const sellers = await User.find({ userType: "seller" });

    res.status(200).json({ sellers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve sellers", error: error.message });
  }
};
const sellerCatalog = async (req, res) => {
  const sellerId = req.params.seller_id;
  try {
    const catalog = await Catalog.findOne({ seller: sellerId }).populate(
      "products"
    );

    if (!catalog) {
      return res.status(404).json({ message: "Catalog not found" });
    }

    res.status(200).json({ catalog });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve seller's catalog",
      error: error.message,
    });
  }
};
const createOrder = async (req, res) => {
  const { items } = req.body;
  const sellerId = req.params.seller_id;
  const buyerId = req.userId;

  try {
    const buyer = await User.find({ _id: buyerId, userType: "buyer" });
    if (!buyer) return res.status(404).json({ message: "Buyer not found" });

    const seller = await User.find({ _id: sellerId, userType: "seller" });
    if (!seller) return res.status(404).json({ message: "Seller not found" });

    const catalog = await Catalog.findOne({ seller: sellerId }).populate(
      "products"
    );
    const productIds = [];

    for (const productId of items) {
      const product = catalog.products.find((prod) => prod._id == productId);
      if (product) {
        productIds.push(product._id);
      }
    }
    if (productIds.length !== items.length) {
      return res
        .status(400)
        .json({ message: "One or more items not found in seller's catalog" });
    }

    const newOrder = new Order({
      buyer: buyerId,
      seller: sellerId,
      products: productIds,
    });

    await newOrder.save();

    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Order creation failed", error: error.message });
  }
};

export { listSellers, sellerCatalog, createOrder };
