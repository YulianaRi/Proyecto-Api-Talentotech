import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { create, findByEmail } from "../models/user.model.js";

export const register = async (req, res) => {
  const { email, password } = req.body || {};

  if (
    typeof email !== "string" ||
    !email.trim() ||
    typeof password !== "string" ||
    !password ||
    password.length < 6
  ) {
    return res
      .status(400)
      .send(
        "Email and password are required and password must be at least 6 characters long",
      );
  }

  const existingUser = await findByEmail(email);

  if (existingUser) {
    return res.status(400).send("Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await create({ email, password: hashedPassword });

  res.status(201).send({ id: user.id, email: user.email });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (typeof email !== "string" || !email.trim() || typeof password !== "string" || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    const user = await findByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({ token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};