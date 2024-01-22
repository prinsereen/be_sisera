import Student from "../models/StudentModel.js";
import {success, error} from "../lib/Responser.js";
import bcrypt from "bcrypt"
import { where } from "sequelize";

export const getAllStudent = async(req, res) => {
    try {
        const student = await Student.findAll({
            attributes: [
                'id',
                'name',
                'email',
            ]
        });
        return success(res, "Berhasil mendapatkan data semua student", student);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getStudentById = async(req, res) => {
    try {
        const student = await Student.findOne({
        attributes: [
            'id',
            'name',
            'email',
        ], 
        where: {
            id: req.params.id 
        }
        })
        if (!student) { return error(res, "Student tidak ditemukan", {})};
        return success(res, "Berhasil mendapatkan data student", student);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

