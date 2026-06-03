import { Sequelize} from "sequelize";
import mysql12 from "mysql2";
const db = new Sequelize ('web_lanjut', 'root', '',{
    host: "localhost",
    dialect: "mysql",
    "define": {
        "timestamps" : false
    }
});
export default db;
