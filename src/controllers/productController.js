import Product from "../models/Product";

export const getProductsController = async (req, res) => {
  const products = await Product.find({ isActive: true });
  if (products.length === 0) {
    res.status(201).send("No products found.");
    return;
  }
  res.status(200).json(products);
};

export const createProductController = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
}