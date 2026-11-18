import * as productModel from "../models/products.model.js";

// 1. Obtener todos los productos (con opción de filtrar por categoryId)
export const getProducts = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const products = await productModel.findAll(categoryId);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// 2. Obtener un producto por su ID
export const getProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).json({ error: "ID de producto no válido" });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar el producto" });
  }
};

// 3. Crear un producto
export const createProduct = async (req, res) => {
  try {
    const { name, price, categoryId } = req.body ?? {};

    if (!name || !price || !categoryId) {
      return res.status(422).json({ error: "Faltan datos del producto" });
    }

    const newProduct = await productModel.create({
      name,
      price: Number(price),
      categoryId: Number(categoryId),
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

// 4. Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).json({ error: "ID de producto no válido" });
    }

    const deletedProduct = await productModel.remove(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ mensaje: "Producto eliminado con éxito", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};