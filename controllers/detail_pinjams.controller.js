import { Buku, DetailPinjam } from "../models/index.model.js";

export const getAllPinjam = async (req, res) => {
  try {
    const data = await DetailPinjam.findAll({
      include: [
        {
          model: Buku,
          as: "buku",
        },
      ],
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const tambahDetail = async (req, res) => {
  try {
    const detail = await DetailPinjam.create(req.body);
    res
      .status(201)
      .json({
        success: true,
        message: "Item berhasil ditambahkan",
        data: detail,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const hapusDetail = async (req, res) => {
  try {
    const deleted = await DetailPinjam.destroy({
      where: { id: req.params.id },
    });

    if (!deleted)
      return res.status(404).json({ message: "Detail tidak ditemukan" });
    res.status(200).json({ success: true, message: "Item berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateJumlah = async (req, res) => {
  try {
    const updated = await DetailPinjam.update(req.body, {
      where: { id: req.params.id },
    });
    res
      .status(200)
      .json({ success: true, message: "Jumlah berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
