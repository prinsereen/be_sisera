import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAllUsers, getUserById } from "../controllers/User.js";

const router = express.Router();

router.get('/users', verifyToken, getAllUsers)
router.get('/users/:id', verifyToken, getUserById)

export default router;