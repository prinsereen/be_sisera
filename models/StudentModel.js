import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Student = db.define('students', {
    student_id:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.uuidV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    student_email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    student_nisn:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true 
        }
    },    
    student_password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    student_grade:{
        type: DataTypes.CHAR(100)
    },
    student_class:{
        type: DataTypes.CHAR(100)
    },
    student_avg_quiz_score: {
        type: DataTypes.FLOAT
    },
    student_avg_read_score: {
        type: DataTypes.FLOAT
    },
    student_competiton_recomendation: {
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
})

export default Student;