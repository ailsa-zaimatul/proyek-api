import express from "express";
import Peminjaman from "../controllers/pinjams.controller.js";
import { authenticateToken } from "../middleware/verify.tokens.js";

const router = express.Router();

// PINTU DIBUKA: Biar bisa dipamerkan di browser saat demo
router.get("/", Peminjaman.getAll);
router.get("/:id", Peminjaman.findById);

// TETAP DIKUNCI: Input, Update, Hapus tetap butuh login
router.post("/", authenticateToken, Peminjaman.add);
router.patch("/:id", authenticateToken, Peminjaman.update);
router.delete("/:id", authenticateToken, Peminjaman.destroy);

export default router;