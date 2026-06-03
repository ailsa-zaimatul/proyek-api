import { DetailPinjam, pinjams, mahasiswas, Buku } from "../models/index.model.js";
export const laporanPengembalian = async (req, res) => {
  try {

    const data = await DetailPinjam.findAll({
      where: { status: 2 },

      attributes: ["jml_pinjam", "updated_at"],

      include: [
        {
          model: pinjams,
          as: "pinjam",

          attributes: ["tanggal_kembali"],

          include: [
            {
              model: mahasiswas,
              as: "mahasiswa",

              attributes: ["nama"]
            }
          ]
        },

        {
          model: Buku,
          as: "buku",

          attributes: ["judul"]
        }
      ]
    });

    const hasil = data.map((item) => {

      const batasKembali = new Date(
        item.pinjam?.tanggal_kembali
      );

      const tanggalKembali = new Date(
        item.updated_at
      );

      let terlambat = Math.floor(
        (tanggalKembali - batasKembali) /
        (1000 * 60 * 60 * 24)
      );

      if (terlambat < 0) terlambat = 0;

      return {
        nama_mahasiswa:
          item.pinjam?.mahasiswa?.nama,

        nama_buku:
          item.buku?.judul,

        jumlah_pinjam:
          item.jml_pinjam,

        tanggal_pengembalian:
          tanggalKembali.toISOString().split("T")[0],

        jumlah_hari_terlambat:
          terlambat
      };
    });

    return res.status(200).json({
      success: true,
      message: "Laporan pengembalian berhasil diambil",
      data: hasil
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};