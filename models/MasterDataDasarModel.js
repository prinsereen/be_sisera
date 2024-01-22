import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const MasterDasar = db.define('master_data_dasar', {
    jenis:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    level:{
        type: DataTypes.ENUM({
            values: ['dasar', 'menengah', 'lanjutan']
        }),
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    value:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },   
    file_path:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
}, {
    freezeTableName: true
})

export default MasterDasar;