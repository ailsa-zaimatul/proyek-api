import { DATE, Sequelize } from "sequelize";
import db from "../config/db.config.js";
import Buku from "./buku.model.js"; 
import DetailPinjam from "./detail_pinjams.model.js";

const { DataTypes } = Sequelize;

const pinjams = db.define(
    "pinjams", 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        tanggal_pinjam: {
            type: DataTypes.DATE, // Perbaikan: Gunakan DATE
        },
        tanggal_kembali: {
            type: DataTypes.DATE, // Perbaikan: Gunakan DATE
        },
        nim: {
            type: DataTypes.INTEGER,
        },
        pegawai_id: {
            type: DataTypes.INTEGER,
        },
        created_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes. DATE,
        },
        },
    
    {
        freezeTableName: true, 
    }
);




export default pinjams;