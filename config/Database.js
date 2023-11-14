import {Sequelize} from "sequelize";

const db = new Sequelize('healthqueue_db', 'root', '', {
    host: "localhost",
    dialect: "mysql",
})

export default db;