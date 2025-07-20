import * as model from "../models/products.model.js";

export const getAllProducts = async (req, res) => {
  res.json(await model.getAllProducts());
};

export const searchProduct = async (req, res) => {
  const { name } = req.query;

  const products = await model.getAllProducts();

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );

  res.json(filteredProducts);
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await model.getProductById(id);

  if (!product) {
    res.status(404).json({ error: "Product not found!" });
  }

  res.json(product);
};

export const createProduct = async (req, res) => {
  const { price, stock, name } = req.body;

  const newProduct = await model.createProduct({ price, stock, name });
  res.status(201).json(newProduct);
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await model.deleteProduct(productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found!" });
  }
  res.status(204).send();
}
