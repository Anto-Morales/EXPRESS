import { Router } from 'express'; // Importar Router de Express
const router = Router(); // Crear instancia del router

// Importar funciones del controlador
import { registerUser, loginUser, logoutUser} from '../controllers/user.controller.js';

// ========== Rutas de usuario ==========
// POST /api/v1/users/register - Registra un nuevo usuario
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Exporta el router configurado
export default router;
