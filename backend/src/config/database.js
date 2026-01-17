/**
 * @fileoverview Módulo de configuración para la conexión a la base de datos MongoDB
 * Este archivo contiene la función para establecer una conexión con MongoDB usando Mongoose
 */

import mongoose from "mongoose";

/**
 * Conecta la aplicación a la base de datos MongoDB
 * 
 * Función asincrónica que:
 * - Se conecta a MongoDB usando la URL almacenada en la variable de entorno MONGODB_URL
 * - Muestra un mensaje de éxito con el nombre del host de la conexión
 * - En caso de error, registra el error y finaliza el proceso con código de salida 1
 * 
 * @async
 * @returns {Promise<void>} No retorna un valor, solo establece la conexión
 * @throws {Error} Si la conexión a MongoDB falla, imprime el error en consola y termina el proceso
 * 
 * @example
 * // Uso en el archivo principal de la aplicación:
 * await connectDB();
 */
const connectDB = async () =>{
    try {
        // Establece conexión con MongoDB usando la URL de entorno
        const connectioInstance = await mongoose.connect
        (`${process.env.MONGODB_URL}`)
        
        // Imprime mensaje de éxito mostrando el host de la conexión
        console.log(`\n Mongo db connected !!!
            ${connectioInstance.connection.host}`);
    }catch (error) {
        // Captura errores de conexión y finaliza el proceso
        console.log("Mongo db connected failed", error);
        process.exit(1);
    }   
}

// Exporta la función para ser utilizada en otros módulos
export default connectDB;