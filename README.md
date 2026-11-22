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
   2. Crear un archivo `.env` en la raíz del proyecto, copiando las variables de `.env.example`, y completarlo con los datos de tu proyecto de Firebase y un `JWT_SECRET` propio.

3. Levantar el servidor:
   ```bash
   npm run dev
   ```
   El servidor corre en `http://localhost:3000`.

## Rutas de la API

### Autenticación

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/auth/register` | Registra un usuario nuevo |
| POST | `/auth/login` | Inicia sesión y devuelve un token |

### Productos

| Método | Ruta | ¿Requiere token? | Descripción |
|---|---|---|---|
| GET | `/api/products` | No | Lista todos los productos |
| GET | `/api/products/:id` | No | Devuelve un producto por ID |
| POST | `/api/products/create` | Sí | Crea un producto |
| DELETE | `/api/products/:id` | Sí | Elimina un producto |

Para las rutas protegidas hay que enviar el token en el header:
`Authorization: Bearer TU_TOKEN`

## Ejemplo para crear un producto

```json
{ "name": "Mouse", "price": 15000, "categoryId": 1 }
```

## Códigos de error

- 400: datos inválidos
- 401: sin token o credenciales incorrectas
- 403: token inválido o vencido
- 404: ruta o producto no encontrado
- 500: error del servidor o de Firebase