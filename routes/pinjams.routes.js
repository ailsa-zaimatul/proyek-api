import express from "express";
import {
  getAllPinjam,
  insertPinjam,
  cariPinjamByNim,
  getDetailPinjam,
  kembalikanBuku,
  laporanPengembalian,
  getBukuDipinjam
} from "../controllers/pinjams.controllers.js";

import { authenticateToken } from "../middleware/verify.tokens.js";

const router = express.Router();

router.post("/", authenticateToken, insertPinjam);
router.get("/", authenticateToken, getAllPinjam);
router.get("/nim/:nim", authenticateToken, cariPinjamByNim);
router.get("/pengembalian/:nim", authenticateToken, getBukuDipinjam);
router.put("/pengembalian/:id", authenticateToken, kembalikanBuku);
router.get("/laporan/pengembalian", authenticateToken, laporanPengembalian);
router.get("/:id", authenticateToken, getDetailPinjam);

export default router;