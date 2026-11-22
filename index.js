import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.routes.js";
import productsRouter from "./src/routes/products.routes.js";
import categoriesRouter from "./src/routes/categories.routes.js"; // <--- Importa esto

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use("/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);

app.get("/", (req, res) => {
  res.send("API del proyecto funcionando correctamente 🚀");
});

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});