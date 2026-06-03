import { Sequelize} from "sequelize";
import mysql12 from "mysql2";
const db = new Sequelize ('defaultdb', 'avnadmin', 'AVNS_dMyS0WcG3jJ-6uWAWCN',{
    host: "mysql-b09e3ec-fitriailsa29-18cc.h.aivencloud.com",
    dialect: "mysql",
    port:18218,
        dialectOptions: { 
ssl: { 
rejectUnauthorized: false 
} 
}, 
        define: 
        "timestamps" : false
    }
});
export default db;
