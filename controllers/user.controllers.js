import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const tambahuser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Pastikan input tidak kosong
    if (!username || !password) {
      return res.status(400).json({ message: "Username dan password wajib diisi!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword
    });

    // Mengembalikan status 201 (Created) untuk data baru
    res.status(201).json({
      message: "User berhasil didaftarkan!",
      data: {
        id: user.id,
        username: user.username
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: { username }
    });

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan"
      });
    }

    const cocok = await bcrypt.compare(password, user.password);

    if (!cocok) {
      return res.status(401).json({
        message: "Password salah"
      });
    }

    // MEMBUAT TOKEN: Kita masukkan id DAN username agar payload aman & padat
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username
      },
      "perpus2025",
      {
        expiresIn: "1h"
      }
    );

    res.json({
      message: "Login berhasil!",
      token
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};