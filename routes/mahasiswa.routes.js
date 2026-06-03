import express from "express";
import Student from "../controllers/mahasiswa.controller.js";
import { authenticateToken } from "../middleware/verify.tokens.js";

const router = express.Router();

router.get("/", authenticateToken, Student.getAll);
router.get("/:id", authenticateToken, Student.findById);
router.post("/", authenticateToken, Student.add);
router.patch("/:id", authenticateToken, Student.update);
router.delete("/:id", authenticateToken, Student.destroy);

export default router;