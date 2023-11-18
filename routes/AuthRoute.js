import express from "express";
import {register} from "../controllers/Auth.js"
import { refreshToken } from "../controllers/RefreshToken.js";
import { Register, Login } from "../validation/AuthValidation.js";

const router = express.Router();

router.post('/register', register, Register)
/* router.post('/login', login)
router.get('/token', refreshToken)
router.delete('/logout', logout)
 */
export default router;