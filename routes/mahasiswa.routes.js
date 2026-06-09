import express from "express";
import Student from "../controllers/mahasiswa.controller.js";
import { authenticateToken } from "../middleware/verify.tokens.js";

const router = express.Router();

// PINTU DIBUKA: Pakai 'Student' dan hapus authenticateToken khusus rute GET
router.get("/", Student.getAll);
router.get("/:id", Student.findById);

// TETAP DIKUNCI: Demi keamanan data tambah, ubah, dan hapus
router.post("/", authenticateToken, Student.add);
router.patch("/:id", authenticateToken, Student.update);
router.delete("/:id", authenticateToken, Student.destroy);

export default router;