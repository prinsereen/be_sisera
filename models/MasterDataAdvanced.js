import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const MasterAdvanced = db.define('master_data_advanced', {
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
}, {
    freezeTableName: true
})

export default MasterAdvanced;