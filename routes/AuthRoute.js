import express from "express";
import {register, login, logout, me} from "../controllers/Auth.js"
import { refreshToken } from "../controllers/RefreshToken.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/register',  register)
router.post('/login', login)
router.get('/token', refreshToken)
router.delete('/logout', logout)
router.get('/me',verifyToken, me)

export default router;