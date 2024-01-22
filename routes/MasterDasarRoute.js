import express from "express";
//import { verifyToken } from "../middleware/verifyToken.js";
import { createMasterDasar, getMasterDasar, getQueryMasterDasar } from "../controllers/MasterDasar.js";

const router = express.Router();

router.post('/masterdasar',   createMasterDasar)
router.get('/masterdasar/get',  getMasterDasar)
router.get('/masterdasar',  getQueryMasterDasar);

export default router;