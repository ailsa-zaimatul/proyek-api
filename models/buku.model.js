import { Sequelize } from "sequelize";
import db from "../config/db.config.js";

const { DataTypes} = Sequelize;
const Buku = db.define(
    "bukus",
    {
        kode_buku: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
       judul: {
        type: DataTypes.STRING,
       },
       tahun_terbit: {
        type: DataTypes.INTEGER,
       },
       jumlah: {
        type: DataTypes.INTEGER
       },
       pengarang_id: {
        type: DataTypes.INTEGER
       },
       penerbit_id: {
        type: DataTypes.INTEGER
       },
       rak_kode_rak:{
        type: DataTypes.INTEGER
       },
       created_at: {
        type: DataTypes.DATE,
        field: 'created_at' // sequelize error
       },
       update_at: {
        type:DataTypes.DATE,
        field: 'update_at' //error
       },
    },
    {
        freezeTableName: true,
        underscored: true, //mengubah default
        timestamps: true, //mengubah default
         createdAt: 'created_at', 
        updatedAt: 'update_at'
    }
);
export default Buku;