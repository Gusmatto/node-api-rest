import * as model from '../models/products.model.js';

export const getAllProducts = async () => {
  return await model.getAllProducts();
};

export const getProductById = async (id) => {
  return await products.find((item) => item.id == id);
};

