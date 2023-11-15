import {Sequelize} from "sequelize";

const db = new Sequelize('arunica_db', 'root', '', {
    host: "localhost",
    dialect: "mysql",
})

export default db;