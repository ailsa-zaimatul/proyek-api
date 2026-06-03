import express from "express";
import Departement from "../controllers/prodi.controller.js";
import { authenticateToken } from "../middleware/verify.tokens.js";

const router = express.Router();

router.get("/", authenticateToken, Departement.getAll);
router.get("/:id", authenticateToken, Departement.findById);
router.post("/", authenticateToken, Departement.add);
router.patch("/:id", authenticateToken, Departement.update);
router.delete("/:id", authenticateToken, Departement.destroy);

export default router;