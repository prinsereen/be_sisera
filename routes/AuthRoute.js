import express from "express";
import {register, login, logout} from "../controllers/Auth.js"
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/token', refreshToken)
router.delete('/logout', logout)

export default router;