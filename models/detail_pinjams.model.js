import { Sequelize } from "sequelize";
import db from "../config/db.config.js";
import pinjams from "./pinjams.model.js";
import Buku from "./buku.model.js";

const { DataTypes } = Sequelize;

const DetailPinjam = db.define(
    "detail_pinjams", 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        pinjam_id: {
            type: DataTypes.INTEGER,
        },
        kode_buku: { 
            type: DataTypes.INTEGER, 
        },
        jml_pinjam: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.INTEGER,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
    },
    {
        freezeTableName: true, 
        //underscored: true,    
        timestamps: false,    
        //createdAt: 'created_at', 
        //updatedAt: 'updated_at'
    }
);



export default DetailPinjam;