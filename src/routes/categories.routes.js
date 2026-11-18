import { Router } from "express";

const router = Router();

// Categorías de ejemplo (vistas en tus primeras clases)
const categories = [
  { id: 1, name: "Tecnología" },
  { id: 2, name: "Hogar" },
];

// Ruta GET para obtener todas las categorías
router.get("/", (req, res) => {
  res.json(categories);
});

export default router;