import express from "express";
import cors from "cors";
import db from "./config/db.config.js";
import "./models/index.model.js"
import bukuRoute from "./routes/buku.routes.js";
import mahasiswas from "./routes/mahasiswa.routes.js"
import prodis from "./routes/prodi.routes.js"
import pinjams from "./routes/pinjams.routes.js";
import detail_pinjam from "./routes/detail_pinjams.routes.js";
import { laporanPengembalian } from "./controllers/pinjams.controllers.js";
import userRoute from "./routes/user.routes.js";

const app = express();

// Fungsi untuk koneksi dan sinkronisasi database
const startServer = async () => {
    try {

        await db.authenticate();
        console.log("Database Terhubung!");

        await db.sync();

        console.log("database synced");

    } catch (error) {

        console.error(
            "Gagal Sinkronisasi:",
            error
        );

    }
};


startServer();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
res.json({message:"Hello coba backend untuk vercel"});
});

// Daftar Route
app.use('/api/user', userRoute);
app.use('/api/buku', bukuRoute);
app.use('/api/mahasiswas', mahasiswas);
app.use('/api/prodi', prodis);
app.use('/api/pinjams', pinjams);
app.use('/api/detail_pinjams', detail_pinjam);
app.get('/api/laporan/pengembalian', laporanPengembalian);

app.listen(5000, () => {
    console.log("Server berjalan di http://localhost:5000");
});

export default app;
