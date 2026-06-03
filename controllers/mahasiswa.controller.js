import { Sequelize } from "sequelize";
import { mahasiswas, Prodi } from "../models/index.model.js"
const getAll = async (_, res) => {
  try {
    const data = await mahasiswas.findAll(
      {
        include: {model: Prodi, attributes: ['nama_prodi']},
  }
    );
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message,});
  }
};

const add = async (req, res) => {
  try {
    await mahasiswas.create(req.body);
    res.status(201).json({
      message: "Mahasiswa berhasil disimpan",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const hasilUpdate = await mahasiswas.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    
    // Logic check: jika tidak ada baris yang berubah
    if (hasilUpdate[0] === 0) {
      return res.status(404).json({ message: "ID tidak ditemukan" });
    }
    
    res.json({
      message: "Data mahasiswa berhasil diperbarui",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const hasilHapus = await mahasiswas.destroy({
      where: {
        id: req.params.id,
      },
    });
    
    if (!hasilHapus) {
      return res.status(404).json({ message: "ID tidak ditemukan" });
    }
    
    res.json({
      message: "Data mahasiswa berhasil dihapus",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const findById = async (req, res) => {
  try {
    const satuMahasiswa = await mahasiswas.findByPk(req.params.id);
    
    if (!satuMahasiswa) {
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }
    
    res.json({
      data: satuMahasiswa,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export default { getAll, add, update, destroy, findById };