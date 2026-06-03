import Buku from "./buku.model.js";
import DetailPinjam from "./detail_pinjams.model.js";
import mahasiswas from "./mahasiswa.model.js";
import pinjams from "./pinjams.model.js";
import Prodi from "./prodi.model.js";
import User from "./user.model.js";


pinjams.belongsTo(mahasiswas, { foreignKey: "nim", as: "mahasiswa" });
mahasiswas.hasMany(pinjams, { foreignKey: "nim", as: "pinjams" });

pinjams.hasMany(DetailPinjam, { foreignKey: "pinjam_id", as: "detail_pinjams" });
DetailPinjam.belongsTo(pinjams, { foreignKey: "pinjam_id", as: "pinjam"}); //untuk pinjam

DetailPinjam.belongsTo(Buku, { foreignKey: "kode_buku", as: "buku" }); //untuk detail
Buku.hasMany(DetailPinjam, { foreignKey: "kode_buku" });

Prodi.hasMany(mahasiswas, { foreignKey: "id_prodi" }); //prodi ke mahasiswa
mahasiswas.belongsTo(Prodi, { foreignKey: "id_prodi" });


export { Buku, mahasiswas, Prodi, pinjams, DetailPinjam, User};
