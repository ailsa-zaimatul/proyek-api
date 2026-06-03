import {Prodi} from "../models/index.model.js";

const getAll = async (_, res) => {
  try {
    // Pakai 'Prodi' sesuai nama yang di-import di baris 1
    const dataProdi = await Prodi.findAll();
    res.json({
      data: dataProdi,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const add = async (req, res) => {
  try {
    await Prodi.create(req.body);
    res.status(201).json({
      message: "Data Prodi berhasil disimpan",
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
    const hasilUpdate = await Prodi.update(req.body, {
      where: {
        kode_prodi: req.params.id, 
      },
    });
    
    if (hasilUpdate[0] === 0) {
      return res.status(404).json({ message: "ID Prodi tidak ditemukan" });
    }
    
    res.json({
      message: "Data Prodi berhasil diperbarui",
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
    const hasilHapus = await Prodi.destroy({
      where: {
        kode_prodi: req.params.id,
      },
    });
    
    if (!hasilHapus) {
      return res.status(404).json({ message: "ID Prodi tidak ditemukan" });
    }
    
    res.json({
      message: "Data Prodi berhasil dihapus",
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
    const satuProdi = await Prodi.findByPk(req.params.id);
    
    if (!satuProdi) {
      return res.status(404).json({ message: "Prodi tidak ditemukan" });
    }
    
    res.json({
      data: satuProdi,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export default { getAll, add, update, destroy, findById };