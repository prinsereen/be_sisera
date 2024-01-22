import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import MasterAdvanced from "./MasterDataAdvanced.js";

const {DataTypes} = Sequelize;

const Video = db.define('videos', {
    data_advaced_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    video_path:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
}, {
    freezeTableName: true
})

Video.belongsTo(MasterAdvanced, {foreignKey: 'data_advaced_id'});

export default Video;