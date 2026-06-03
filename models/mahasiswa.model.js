import { Sequelize } from "sequelize";
import db from "../config/db.config.js";
import ref_prodi from "./prodi.model.js";

const { DataTypes } = Sequelize;

const mahasiswas = db.define(
    "mahasiswas", // Ini nama tabel di SQL nanti
    {
        nim: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nama: {
            type: DataTypes.STRING,
        },
        tempat_lahir: {
            type: DataTypes.STRING, 
        },
        tanggal_lahir: {
            type: DataTypes.DATE,
        },
        id_prodi: {
            type: DataTypes.INTEGER,
        },
        tahun_masuk: { 
            type: DataTypes.INTEGER 
        },
    },
    {
        freezeTableName: true, // WAJIB: Biar namanya tetap 'mahasiswas'
        underscored: true,    // WAJIB: Biar tidak muncul createdAt huruf besar
        timestamps: true,     // Mengaktifkan fitur waktu otomatis
        createdAt: 'created_at', 
        updatedAt: 'updated_at'
    }
);



export default mahasiswas;