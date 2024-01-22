import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import MasterAdvanced from "./MasterDataAdvanced.js";

const {DataTypes} = Sequelize;

const CeritaCard = db.define('cerita_cards', {
    data_advaced_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    gambar_path:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    audio_path:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
}, {
    freezeTableName: true
})

MasterAdvanced.hasMany(CeritaCard);
CeritaCard.belongsTo(MasterAdvanced, {foreignKey: 'data_advaced_id'});

export default CeritaCard;