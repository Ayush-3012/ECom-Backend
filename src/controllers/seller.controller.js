import { Catalog } from "../models/catalog.models.js";
import { Product } from "../models/product.models.js";
import { Order } from "../models/order.models.js";
import { User } from "../models/user.models.js";

const createCatalog = async (req, res) => {
  const { products } = req.body;
  const sellerId = req.userId;

  try {
    const seller = await User.findOne({ _id: sellerId, userType: "seller" });
    if (!seller) {
      return res
        .status(404)
        .json({ message: "Seller not found or is not a valid seller" });
    }

    let existingCatalog = await Catalog.findOne({ seller: sellerId });

    if (!existingCatalog) {
      existingCatalog = new Catalog({ seller: sellerId, products: [] });
    }

    const productIds = [];

    for (const product of products) {
      const newProduct = new Product({
        name: product.name,
        price: product.price,
      });
      await newProduct.save();
      productIds.push(newProduct._id);
    }

    existingCatalog.products = existingCatalog.products.concat(productIds);

    await existingCatalog.save();
    res.status(201).json({ message: "Catalog created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Catalog creation failed", error: error.message });
  }
};
const orderList = async (req, res) => {
  const sellerId = req.userId;
  try {
    const seller = await User.findOne({ _id: sellerId, userType: "seller" });

    if (!seller) {
      return res
        .status(404)
        .json({ message: "Seller not found or is not a valid seller" });
    }

    const orders = await Order.find({ seller: seller._id }).populate(
      "products"
    );

    res.status(200).json({ orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve orders", error: error.message });
  }
};

export { createCatalog, orderList };
