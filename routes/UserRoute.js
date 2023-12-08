import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAllStudent, getStudentById, updateStudentById } from "../controllers/Student.js";


const router = express.Router();

router.get('/student', verifyToken, getAllStudent)
router.get('/student/:id', verifyToken, getStudentById)
router.post('/student/:id', verifyToken, updateStudentById)

export default router;