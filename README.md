# API REST de Productos y Autenticación

Este es un proyecto de práctica desarrollado con Node.js y Express donde armé una API REST conectada a Firebase (Cloud Firestore) para gestionar productos y manejar registro e inicio de sesión de usuarios con JWT.

## ¿Qué tiene este proyecto?

- Registro de usuarios con contraseñas encriptadas usando `bcryptjs`.
- Inicio de sesión con generación de token (`jsonwebtoken`).
- Rutas protegidas mediante un middleware propio que verifica el `Bearer Token`.
- CRUD de productos conectado a Cloud Firestore.

## Tecnologías que usé

- Node.js y Express
- Firebase / Cloud Firestore
- JSON Web Token (`jsonwebtoken`)
- `bcryptjs`
- `dotenv` y `cors`

## Cómo levantarlo en local

1. Clonar el repositorio e instalar las dependencias:
   ```bash
   npm install