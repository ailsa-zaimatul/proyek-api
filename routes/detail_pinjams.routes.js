import express from "express";

import {
    tambahDetail,
    hapusDetail,
    updateJumlah,
    getAllPinjam,
} from "../controllers/detail_pinjams.controller.js";

import { authenticateToken } from "../middleware/verify.tokens.js";

const router= express.Router();
router.post ("/",authenticateToken, tambahDetail);
router.delete ("/:id",authenticateToken, hapusDetail);
router.post ("/:id",authenticateToken, updateJumlah)
router.patch ("/:id",authenticateToken, updateJumlah);
router.get ('/', authenticateToken, getAllPinjam);

export default router;