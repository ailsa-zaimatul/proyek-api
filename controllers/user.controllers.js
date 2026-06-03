import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const tambahuser = async (req, res) => {
  try {

    const { username, password } = req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword
    });

    res.json(user);

  } catch (error) {

    res.json({
      message: error.message
    });

  }
};

export const login = async (req, res) => {
  try {

    const { username, password } = req.body;

    const user = await User.findOne({
      where: {
        username
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan"
      });
    }

    const cocok = await bcrypt.compare(
      password,
      user.password
    );

    if (!cocok) {
      return res.status(401).json({
        message: "Password salah"
      });
    }

    const token = jwt.sign(
      {
        id: user.id
      },
      "perpus2025",
      {
        expiresIn: "1h"
      }
    );

    res.json({
      token
    });

  } catch (error) {

    res.json({
      message: error.message
    });

  }
};