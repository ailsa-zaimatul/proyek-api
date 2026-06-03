import { Sequelize} from "sequelize";
import mysql12 from "mysql2";
const db = new Sequelize ('web_lanjut', 'mysql-b09e3ec-fitriailsa29-18cc.h.aivencloud.com', '',{
    host: "localhost",
    dialect: "mysql",
    "define": {
        "timestamps" : false
    }
});
export default db;
