import {
  pinjams,
  DetailPinjam,
  mahasiswas,
  Buku,
} from "../models/index.model.js";
import { Sequelize } from "sequelize";

//pinjam buku
//POST http://localhost:5000/api/pinjams
// raw {
//"tanggal_kembali": "2026-05-20",
//"nim": "102",
//"pegawai_id": 1,
//"detail_pinjams": [
//{"kode_buku": 11,"jml_pinjam": 1,"status": 1},
//{"kode_buku": 12,"jml_pinjam": 1,"status": 1}
// ]
//}
// status 1 = buku dipinjam, status 2 = buku dikembalikan
export const insertPinjam = async (req, res) => {
  try {
    // validasi detail_pinjams harus array
    if (!Array.isArray(req.body.detail_pinjams)) {
      return res.status(400).json({
        message: "detail_pinjams harus array",
      });
    }

    const return_date = new Date();
    return_date.setDate(return_date.getDate() + 7); //buku yg dipinjam otomatis hrs dikembalikan setelah 7 hari masa peminjaman

    //const tanggal_pinjam = new Date(req.body.tanggal_pinjam);
//const tanggal_kembali = new Date(req.body.tanggal_kembali);
    //jika ingin mengisi manual tgl peminjaman&pengembalian

    // simpan data pinjam + detail pinjam
    const data = await pinjams.create(
      {
        tanggal_kembali: return_date,
        nim: req.body.nim,
        pegawai_id: req.body.pegawai_id,
        detail_pinjams: req.body.detail_pinjams,
      },
      {
        include: [
          {
            model: DetailPinjam,
            as: "detail_pinjams",
          },
        ],
      },
    );

    //kurangi stok buku
    //for (const item of req.body.detail_pinjams) {
    //await Buku.decrement("jumlah", {
    //by: item.jml_pinjam,
    //where: {
    //kode_buku: item.kode_buku
    //}
    //});
    //}

    // kurangi stok
    if (data && req.body.detail_pinjams) {
      for (let i = 0; i < req.body.detail_pinjams.length; i++) {
        const buku = await Buku.findOne({
            where: {
              kode_buku: req.body.detail_pinjams[i].kode_buku,
            },
        });

        // cek buku ada atau tidak
        if (!buku) {
          return res.status(404).json({
            success: false,
            message: `Buku dengan kode ${item.kode_buku} tidak ditemukan`,
          });
          break;
        }

        // cek stok cukup atau tidak
        if (buku.jumlah < req.body.detail_pinjams[i].jml_pinjam) {
          return res.status(400).json({
            success: false,
            message: `Stok buku ${buku.judul} tidak cukup`,
          });
          break;
        }
        // Cek stok buku, jika stok buku < kuantitas yang ingin dipinjam
        // Tampilkan pesan error
        // Jika tidak, lanjutkan

        await buku.decrement(
          { jumlah: req.body.detail_pinjams[i].jml_pinjam },
        );
      }
    }

    // kurangi stok buku (dipindahkan ke dalam try sebelum return)
    for (const item of req.body.detail_pinjams) {
      const buku = await Buku.findOne({
        where: {
          kode_buku: item.kode_buku,
        },
      });

      // cek buku ada atau tidak
      if (!buku) {
        return res.status(404).json({
          success: false,
          message: `Buku dengan kode ${item.kode_buku} tidak ditemukan`,
        });
        break;
      }

      // cek stok cukup atau tidak
      if (buku.jumlah < item.jml_pinjam) {
        return res.status(400).json({
          success: false,
          message: `Stok buku ${buku.judul} tidak cukup`,
        });
        break;
      }

      // await buku.decrement(
      //   { jumlah: item.jml_pinjam },
      //   {
      //     where: { kode_buku: item.kode_buku },
      //   },
      // );
    }

    // 4. Kirim respon sukses
    return res.status(201).json({
      success: true,
      message: "Peminjaman berhasil",
      data: data,
    });

    // --- Catatan: Kode di bawah ini tidak akan pernah dieksekusi karena sudah ada return di atas ---
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//pinjam yang sedang dipinjam
//get http://localhost:5000/api/pinjams/dipinjam/nim (masukkan angka nim)
// raw: no body
export const getBukuDipinjam = async (req, res) => {
  try {
    const data = await DetailPinjam.findAll({
      where: {
        status: 1,
      },
      attributes: ["id", "jml_pinjam"],
      include: [
        {
          model: pinjams,
          where: {
            nim: req.params.nim,
          },
          include: [
            {
              model: mahasiswas,
              attributes: ["nama"],
            },
          ],
        },
        {
          model: Buku,
          attributes: ["judul"],
        },
      ],
    });

    const hasil = data.map((item) => ({
      id_detail_pinjam: item.id,
      nama_mahasiswa: item.pinjam?.mahasiswa?.nama,
      judul_buku: item.buku?.judul,
      jumlah_pinjam: item.jml_pinjam,
    }));

    res.status(200).json({
      success: true,
      data: hasil,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// pengembalian buku
// put http://localhost:5000/api/pinjams/pengembalian/pinjam_id (masukkan id pinjam)
//raw {
// "books": [ {"id_detail_pinjam": 7 }]}
export const kembalikanBuku = async (req, res) => {
  try {
    const id_pinjam = req.params.id;
    const { books } = req.body;

    // validasi books harus array
    if (!Array.isArray(books)) {
      return res.status(400).json({
        success: false,
        message: "books harus array",
      });
    }

    // cek transaksi peminjaman
    const pinjam = await pinjams.findOne({
      where: {
        id: id_pinjam,
      },
      include: [
        {
          model: DetailPinjam,
          as: "detail_pinjams",
        },
      ],
    });

    // cek transaksi ada atau tidak
    if (!pinjam) {
      return res.status(404).json({
        success: false,
        message: "Data peminjaman tidak ditemukan",
      });
    }

    // ambil detail yang masih dipinjam
    const detailPinjam = pinjam.detail_pinjams.filter(
      (item) => item.status == 1,
    );

    // looping pengembalian
    for (const book of books) {
      const detail = detailPinjam.find(
        (item) => item.id == book.id_detail_pinjam,
      );

      // cek detail ditemukan
      if (!detail) {
        return res.status(404).json({
          success: false,
          message: `Detail pinjam ID ${book.id_detail_pinjam} tidak ditemukan`,
        });
      }

      // qty default = semua
      const qty = book.jml_kembali ?? detail.jml_pinjam;

      // validasi qty > 0
      if (qty <= 0) {
        return res.status(400).json({
          success: false,
          message: "Jumlah pengembalian harus lebih dari 0",
        });
      }

      // validasi qty tidak boleh lebih besar
      if (qty > detail.jml_pinjam) {
        return res.status(400).json({
          success: false,
          message: `Jumlah pengembalian melebihi jumlah pinjaman. Maksimal ${detail.jml_pinjam}`,
        });
      }

      // CASE 1 -> kembali semua
      if (qty == detail.jml_pinjam) {
        await DetailPinjam.update(
          {
            status: 2,
            updated_at: new Date(),
          },
          {
            where: {
              id: detail.id,
            },
          },
        );
      } else {
        // CASE 2 -> kembali sebagian

        const sisa = detail.jml_pinjam - qty;

        // update sisa pinjaman
        await DetailPinjam.update(
          {
            jml_pinjam: sisa,
            updated_at: new Date(),
          },
          {
            where: {
              id: detail.id,
            },
          },
        );

        // insert riwayat pengembalian
        //get http://localhost:5000/api/pinjams
        await DetailPinjam.create({
          pinjam_id: detail.pinjam_id,
          kode_buku: detail.kode_buku,
          jml_pinjam: qty,
          status: 2,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      // tambah stok buku
      await Buku.increment(
        {
          jumlah: qty,
        },
        {
          where: {
            kode_buku: detail.kode_buku,
          },
        },
      );
    }

    return res.status(200).json({
      success: true,
      message: "Pengembalian buku berhasil",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//laporan peminjaman
// export const laporanPengembalian = async (req, res) => {
//   try {
//     const data = await DetailPinjam.findAll({
//       where: {
//         status: 2
//       }
//     });

//     res.status(200).json({
//       success: true,
//       data
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

//get all pinjam
export const getAllPinjam = async (req, res) => {
  try {
    const data = await pinjams.findAll({
      include: [{
  model: mahasiswas,
  as: "mahasiswa",
  attributes: ["nama", "nim"]
}]
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//pinjam by nim
export const cariPinjamByNim = async (req, res) => {
  try {
    const data = await pinjams.findAll({
      where: {
        nim: req.params.nim,
      },

      include: [
        {
          model: DetailPinjam,
          as: "detail_pinjams",
          where: {
            status: 1,
          },
        },
        {
          model: mahasiswas,
          as: "mahasiswa",
        },
      ],
    });

    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }

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

//detail peminjaman
export const getDetailPinjam = async (req, res) => {
  try {
    const data = await pinjams.findByPk(req.params.id, {
      include: [DetailPinjam],
    });

    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Transaksi tidak ditemukan" });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//laporan pengembalian
// get http://localhost:5000/api/pinjams/laporan/pengembalian
export const laporanPengembalian = async (req, res) => {
  try {
    const data = await DetailPinjam.findAll({
      where: { status: 2 },

      attributes: ["pinjam_id", "jml_pinjam", "updated_at"],

      include: [
        {
          model: pinjams,
          as: "pinjam",

          attributes: ["tanggal_kembali"],

          include: [
            {
              model: mahasiswas,
              as: "mahasiswa",

              attributes: ["nama"],
            },
          ],
        },

        {
          model: Buku,
          as: "buku",

          attributes: ["judul"],
        },
      ],
    });

    const hasil = data.map((item) => {
      const batasKembali = new Date(item.pinjam?.tanggal_kembali);

      const tanggalKembali = new Date(item.updated_at);

      let terlambat = Math.floor(
        (tanggalKembali - batasKembali) / (1000 * 60 * 60 * 24),
      );

      if (terlambat < 0) terlambat = 0;

      return {
        // TODO: Tambahkan ID okeiiii?
        pinjam_id: item.pinjam_id,

        nama_mahasiswa: item.pinjam?.mahasiswa?.nama,

        nama_buku: item.buku?.judul,

        jumlah_pinjam: item.jml_pinjam,

        tanggal_pengembalian: tanggalKembali.toISOString().split("T")[0],

        jumlah_hari_terlambat: `${terlambat} hari`
      };
    });

    return res.status(200).json({
      success: true,
      message: "Laporan pengembalian berhasil diambil",
      data: hasil,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


