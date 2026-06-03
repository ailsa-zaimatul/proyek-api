import { Sequelize } from "sequelize";
import db from "../config/db.config.js";

const { DataTypes } = Sequelize;

const Prodi = db.define(
    "prodis", // Nama tabel di MySQL
    {
        kode_prodi: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nama_prodi: {
            type: DataTypes.STRING,
        },
        singkatan: {
            type: DataTypes.STRING,
        },
        // created_at & updated_at otomatis diurus di bawah
    },
    {
        freezeTableName: true, // BIAR TABEL TETAP ADA & NAMANYA GAK BERUBAH
        underscored: true,    // BIAR created_at GAK DOBEL
        timestamps: true,     // AKTIFKAN WAKTU OTOMATIS
        createdAt: 'created_at', 
        updatedAt: 'updated_at'
    }
);

export default Prodi;