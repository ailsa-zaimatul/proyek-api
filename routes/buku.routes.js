import express from "express";

import {
    deleteBuku,
    getAllProducts,
    tambahbukubaru,
    cariBukuByID,
    updateBuku
} from "../controllers/buku.controllers.js";

import { authenticateToken } from "../middleware/verify.tokens.js";

const router = express.Router();

router.get("/", authenticateToken, getAllProducts);
router.post("/", authenticateToken, tambahbukubaru);
router.delete("/:id", authenticateToken, deleteBuku);
router.post("/:id", authenticateToken, cariBukuByID);
router.put("/:id", authenticateToken, updateBuku);

export default router;