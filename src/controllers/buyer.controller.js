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
  const sellerId = req.params.sellerId; // Assuming the sellerId is passed in the request parameters

  try {
    // Find catalog by sellerId
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
  const { sellerId, items } = req.body;

  try {
    // Create a new order
    const newOrder = new Order({
      buyer: req.user._id, // Assuming user details are available in the request
      seller: sellerId,
      products: items,
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
