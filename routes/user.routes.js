import express from "express";

import {
  tambahuser,
  login
} from "../controllers/user.controllers.js";

import {
  authenticateToken
} from "../middleware/verify.tokens.js";

const router = express.Router();

router.post("/", tambahuser);

router.post("/login", login);

router.get(
  "/dashboard",
  authenticateToken,
  (req, res) => {
    res.send("Welcome Dashboard");
  }
);

export default router;