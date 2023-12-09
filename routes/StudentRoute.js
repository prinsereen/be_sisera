import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAllStudent, getStudentById, updateStudentById, deleteStudentById } from "../controllers/Student.js";


const router = express.Router();

router.get('/student', verifyToken, getAllStudent)
router.get('/student/:id', verifyToken, getStudentById)
router.patch('/student/:id', verifyToken, updateStudentById)
router.delete('/student/:id', verifyToken, deleteStudentById)

export default router;