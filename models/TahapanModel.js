import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import MasterAdvanced from "./MasterDataAdvanced.js";

const {DataTypes} = Sequelize;

const Tahapan = db.define('tahapan', {
    data_advaced_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    assets_1:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    assets_2:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    assets_3:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
}, {
    freezeTableName: true
})

Tahapan.belongsTo(MasterAdvanced, {foreignKey: 'data_advaced_id'});

export default Tahapan;