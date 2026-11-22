import * as productModel from "../models/products.model.js";

// 1. Todos los productos
export const getProducts = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const products = await productModel.findAll(categoryId);
    res.json(products);
  } catch (error) {
    console.error("Error en getProducts:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// 2. Obtener por ID
export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ error: "ID de producto no válido" });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error en getProductById:", error);
    res.status(500).json({ error: "Error al buscar el producto" });
  }
};

// 3. Crear un producto
export const createProduct = async (req, res) => {
  try {
    const { name, price, categoryId } = req.body ?? {};

    if (!name || price === undefined || categoryId === undefined) {
      return res.status(422).json({ error: "Faltan datos del producto" });
    }

        if (typeof name !== "string" || !name.trim() || isNaN(Number(price)) || Number(price) <= 0) {
      return res.status(400).json({ error: "Nombre o precio inválido" });
    }

    const newProduct = await productModel.create({
      name,
      price: Number(price),
      categoryId: Number(categoryId),
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error en createProduct:", error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

// 4. Actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ error: "ID de producto no válido" });
    }

    const { name, price, categoryId } = req.body ?? {};

    if (!name || price === undefined || categoryId === undefined) {
      return res.status(422).json({ error: "Faltan datos del producto" });
    }

    const updatedProduct = await productModel.update(productId, {
      name,
      price: Number(price),
      categoryId: Number(categoryId),
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error en updateProduct:", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

// 5. Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ error: "ID de producto no válido" });
    }

    const deletedProduct = await productModel.remove(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ mensaje: "Producto eliminado con éxito", product: deletedProduct });
  } catch (error) {
    console.error("Error en deleteProduct:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};