import express from "express";
import Departement from "../controllers/prodi.controller.js";
import { authenticateToken } from "../middleware/verify.tokens.js";

const router = express.Router();

// PINTU DIBUKA: authenticateToken dihapus khusus untuk GET saja
router.get("/", Departement.getAll);
router.get("/:id", Departement.findById);

// TETAP DIKUNCI: Demi keamanan data agar tidak sembarang orang bisa nambah/hapus
router.post("/", authenticateToken, Departement.add);
router.patch("/:id", authenticateToken, Departement.update);
router.delete("/:id", authenticateToken, Departement.destroy);

export default router;