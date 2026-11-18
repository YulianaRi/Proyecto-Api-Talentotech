import express from "express";
import cors from "cors";
import productsRouter from "./src/routes/products.routes.js";
import categoriesRouter from "./src/routes/categories.routes.js"; // <--- Importa esto

const app = express();

app.use(express.json());
app.use(cors());

// Middleware de registro
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Rutas principales de la API
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter); // <--- Úsalo aquí

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API del proyecto funcionando correctamente 🚀");
});

// Manejo de errores 404 (Requerimiento del PDF)
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});