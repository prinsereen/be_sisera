import express from "express";
import { recognize } from "../controllers/ImageRecognition.js";

const router = express.Router();

router.post('/recognize', recognize);

export default router;