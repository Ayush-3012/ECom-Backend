import { Catalog } from "../models/catalog.models.js";
import { Product } from "../models/product.models.js";

const createCatalog = async (req, res) => {
  const { sellerId, products } = req.body;

  try {
    // Check if the sellerId exists (You might want to verify the seller's authenticity)
    // ... (seller validation logic)

    // Create a new catalog for the seller
    const newCatalog = new Catalog({ seller: sellerId });

    // Create and add products to the catalog
    const productIds = [];
    for (const product of products) {
      const newProduct = new Product({
        name: product.name,
        price: product.price,
      });
      await newProduct.save();
      productIds.push(newProduct._id);
    }

    newCatalog.products = productIds;
    await newCatalog.save();

    res.status(201).json({ message: "Catalog created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Catalog creation failed", error: error.message });
  }
};
const orderList = async (req, res) => {
  const sellerId = req.params.sellerId; // Assuming the sellerId is passed in the request parameters

  try {
    // Find orders by sellerId
    const orders = await Order.find({ seller: sellerId }).populate("products");

    res.status(200).json({ orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve orders", error: error.message });
  }
};

export { createCatalog, orderList };
