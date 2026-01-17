// Importa las dependencias necesarias
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

// Carga las variables de entorno desde el archivo .env
dotenv.config({
    path: "./.env"
});

/**
 * Inicia el servidor de la aplicación
 * 
 * - Conecta a la base de datos MongoDB
 * - Maneja errores de la aplicación Express
 * - Inicia el servidor en el puerto especificado en el entorno (puerto 8000 por defecto)
 */
const startServer = async () => {
    try {
        // Conecta a la base de datos
        await connectDB();

        // Escucha y captura errores de la aplicación
        app.on("error", (error) => {
            console.log("Error", error);
            throw error;
        });

        // Inicia el servidor en el puerto configurado o en el 8000
        app.listen(process.env.PORT|| 8000, () => {
            console.log(`Server is running on port:
                ${process.env.PORT}`);
        });
    } catch (error) {
        console.log("Mongo db connection failed ", error);
    }
}

// Ejecuta la función para iniciar el servidor
startServer();