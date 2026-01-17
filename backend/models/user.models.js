import mongoose, { Schema } from 'mongoose';
import bcrypt from "bcrypt";

/**
 * Schema de usuario con los siguientes campos:
 * - username: Nombre de usuario único, entre 10 y 30 caracteres
 * - password: Contraseña encriptada, entre 6 y 50 caracteres
 * - email: Email único del usuario
 * - timestamps: Registra fechas de creación y actualización
 */
const userSchema = new Schema(
    {
        // Nombre de usuario único, en minúsculas y sin espacios
        username: {
            type: String,
            required: true,
            unique: true,   
            lowercase: true,
            trim: true,  
            minLenght:10,
            maxLenght:30
        },
        // Contraseña del usuario (se debe encriptar antes de guardar)
        password:{
            type: String,
            required: true, 
            minLenght:6,
            maxLenght:50
        },
        // Email único del usuario, en minúsculas y sin espacios
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        }
    },
    // Agrega timestamps automáticos (createdAt y updatedAt)
    {
        timestamps: true
    }
)

// before saving any password we need to hash it
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});



//compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
// Exporta el modelo de usuario basado en el schema definido
export const User = mongoose.model("User", userSchema);