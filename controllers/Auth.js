import Student from "../models/StudentModel.js";
import {success, error} from "../lib/Responser.js"
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken";
import { check, validationResult } from "express-validator";

export const register = async(req, res) => {
    const {student_name, student_email, student_nisn, student_password, student_conf_password} = req.body;

    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return error(res,  errors["errors"][0].path + " " + errors["errors"][0].msg, errors["errors"])
    }

    try {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(student_password, salt);

        const newStudent = await Student.create({
            student_name: student_name,
            student_email: student_email,
            student_nisn: student_nisn,
            student_password: hashPassword
        });

        const studentData = newStudent.get();
        console.log(studentData)

        delete studentData.id;
        delete studentData.student_id;
        delete studentData.student_password;
        delete studentData.updatedAt;
        delete studentData.createdAt;
        
        return success(res, "Berhasil Register", studentData);
        
    } catch (error) {
        console.log(error)
    }
}

/* export const login = async(req, res) => {
    try {
        const user = await Student.findAll({
            where:{
                nik: req.body.nik,
                jenis_pengguna: req.body.jenis_pengguna
            }
        })
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"})
        const userId = user[0].id;
        const name = user[0].name;
        const jenis_pengguna = user[0].jenis_pengguna;
        const nik = user[0].nik;

        const accessToken = jwt.sign({userId, name, jenis_pengguna, nik}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '60s'
        });
        const refreshToken = jwt.sign({userId, name, jenis_pengguna, nik}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken}, {
            where: {
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24*60*1000
        });
        res.json({accessToken})
    } catch (error) {
        res.status(404).json({msg: "User Tidak Ditemukan"})
    }
}

export const logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200)
} */