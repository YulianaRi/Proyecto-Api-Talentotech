import fs from "fs/promises";
import path from "path";

// Ruta hacia el archivo catalog.json
const filePath = path.resolve("data/catalog.json");

// Función auxiliar para leer el catálogo
const readCatalog = async () => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { products: [], categories: [] };
  }
};

// Función auxiliar para escribir en el catálogo
const writeCatalog = async (data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
};

// 1. Obtener todos (con soporte para filtrar por categoría si se pasa)
export const findAll = async (categoryId) => {
  const catalog = await readCatalog();
  if (!categoryId) {
    return catalog.products;
  }
  return catalog.products.filter(p => p.categoryId === parseInt(categoryId));
};

// 2. Buscar por ID
export const findById = async (id) => {
  const catalog = await readCatalog();
  return catalog.products.find(p => p.id === parseInt(id));
};

// 3. Crear un producto
export const create = async (productData) => {
  const catalog = await readCatalog();
  const newProduct = {
    id: catalog.products.length > 0 ? catalog.products[catalog.products.length - 1].id + 1 : 1,
    ...productData
  };
  
  catalog.products.push(newProduct);
  await writeCatalog(catalog);
  return newProduct;
};

// 4. Eliminar un producto (tal como muestra tu última captura)
export const remove = async (id) => {
  const catalog = await readCatalog();
  const index = catalog.products.findIndex((p) => p.id === parseInt(id));

  if (index === -1) {
    return null;
  }

  const [removedProduct] = catalog.products.splice(index, 1);
  await writeCatalog(catalog);

  return removedProduct;
};