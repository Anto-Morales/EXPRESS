import express from "express";
const app = express(); // Crea la instancia de la aplicación Express
app.use(express.json()); // Middleware para parsear solicitudes JSON

// ========== Importación de rutas ==========
import userRouter from "../routes/user.route.js";

// ========== Declaración de rutas ==========
// Rutas para usuarios
app.use("/api/v1/users", userRouter);


// Exporta la aplicación configurada
export default app;


