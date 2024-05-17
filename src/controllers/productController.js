import Product from "../models/Product";

export const getProductsController = async (req, res) => {
    const products = await Product.find({isActive : true});
    if(products.length === 0) {
      res.status(201).send("No products found.");
      return;
    }
    res.status(200).json(products);
  };