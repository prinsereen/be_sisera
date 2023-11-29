import Student from "../models/StudentModel.js";
import {success, error} from "../lib/Responser.js"
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken";
import { check, validationResult } from "express-validator";

export const register = async(req, res) => {
    const {student_name, student_email, student_nisn, student_password, student_conf_password} = req.body;

    const errors = validationResult(req);
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

export const login = async(req, res) => {
    try {

        const {student_nisn, student_password} = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return error(res,  errors["errors"][0].path + " " + errors["errors"][0].msg, errors["errors"])
        }

        const user = await Student.findOne({
            where:{
                student_nisn: student_nisn
            }
        })

        const match = await bcrypt.compare(student_password, user.student_password);
        if(!match) return error(res, "Wrong Password")

        const name = user.student_name;
        const email = user.student_email;
        const Nisn = user.student_nisn;

        const accessToken = jwt.sign({name, email, Nisn}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        const refreshToken = jwt.sign({name, email, Nisn}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await Student.update({refresh_token: refreshToken}, {
            where: {
                student_name: name
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24*60*1000
        });
        res.json({accessToken})
    } catch (error) {
        console.log(error)
        res.status(404).json({msg: "User Tidak Ditemukan"})
    }
}

export const logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Student.findOne({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user) return res.sendStatus(204);
    const student_nisn = user.student_nisn;
    await Student.update({refresh_token: null},{
        where:{
            student_nisn: student_nisn
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200)
}