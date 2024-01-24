import express from "express";
//import { verifyToken } from "../middleware/verifyToken.js";
import { createMasterAdvaced, createCeritaCard } from "../controllers/MasterAdvanced.js"

const router = express.Router();

router.post('/masteradvanced',   createMasterAdvaced);
router.post('/masteradvanced/card',  createCeritaCard);

export default router;