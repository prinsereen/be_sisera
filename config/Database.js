import {Sequelize} from "sequelize";

const db = new Sequelize('sisera_db', 'root', '', {
    host: "localhost",
    dialect: "mysql",
})

export default db;