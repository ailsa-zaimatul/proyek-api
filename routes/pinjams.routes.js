import express from "express";
// WAJIB pakai { } dan sesuaikan namanya dengan fungsi di controller
import { 
    insertPinjam, 
    getBukuDipinjam, 
    kembalikanBuku, 
    getAllPinjam, 
    cariPinjamByNim, 
    getDetailPinjam, 
    laporanPengembalian 
} from "../controllers/pinjams.controllers.js"; 
import { authenticateToken } from "../middleware/verify.tokens.js";

const router = express.Router();

router.get("/", getAllPinjam);
router.post("/", authenticateToken, insertPinjam);
router.get("/dipinjam/:nim", getBukuDipinjam);
router.put("/pengembalian/:id", authenticateToken, kembalikanBuku);
router.get("/cari/:nim", cariPinjamByNim);
router.get("/laporan/pengembalian", laporanPengembalian);
router.get("/:id", getDetailPinjam);

export default router;