import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Users = db.define('users', {
    name:{
        type: DataTypes.STRING
    },
    jenis_pengguna:{
        type: DataTypes.STRING
    },    
    umur:{
        type: DataTypes.STRING
    },
    nik:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    riwayat_penyakit: {
        type: DataTypes.TEXT
    },
    riwayat_alergi: {
        type: DataTypes.TEXT
    },
    berat_badan: {
        type: DataTypes.TEXT
    },
    tinggi_badan: {
        type: DataTypes.TEXT
    },
    riwayat_penyakit: {
        type: DataTypes.TEXT
    },
    tekanan_darah: {
        type: DataTypes.TEXT
    },
    denyut_jantung: {
        type: DataTypes.TEXT
    },
    catatan_tambahan: {
        type: DataTypes.TEXT
    },
    refresh_token: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
})

export default Users;