import Student from "../models/StudentModel.js";
import {success, error} from "../lib/Responser.js";
import bcrypt from "bcrypt"
import { where } from "sequelize";

export const getAllStudent = async(req, res) => {
    try {
        const student = await Student.findAll({
            attributes: [
                'student_id',
                'student_name',
                'student_email',
                'student_nisn',
                'student_grade',
                'student_class',
                'student_avg_quiz_score',
                'student_avg_read_score',
                'student_competiton_recomendation'
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
            'student_id',
            'student_name',
            'student_email',
            'student_nisn',
            'student_grade',
            'student_class',
            'student_avg_quiz_score',
            'student_avg_read_score',
            'student_competiton_recomendation'
        ], 
            where: {
                student_id: req.params.id 
            }
        })
        if (!student) { return error(res, "Student tidak ditemukan", {})};
        return success(res, "Berhasil mendapatkan data student", student);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const updateStudentById = async (req, res) => {
    try { 
        let student = await findStudentById(req.params.id);

        if (!student) {
            return error(res, "Student tidak ditemukan", {});
        }

        const { name, email, clas, grade, password, confPassword } = req.body;
        if (req.user.student_id != req.params.id){return error(res, "Unauthorized", {}, 401);}

        let hashPassword = student.student_password;

        if (password) {
            const salt = await bcrypt.genSalt();
            hashPassword = await bcrypt.hash(password, salt);
        }

        if (password && password !== confPassword) {
            return error(res, "Password dan confirmation tidak sesuai", {});
        }

        await Student.update(
            {
                student_name: name,
                student_email: email,
                student_class: clas,
                student_grade: grade,
                student_password: hashPassword
            },
            {
                where: {
                    student_id: req.params.id
                },
                attributes: [
                    'student_id',
                    'student_name',
                    'student_email',
                    'student_class',
                    'student_grade'
                ]
            }
        );

        student = await findStudentById(req.params.id);

        return success(res, "Update berhasil", student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error.message });
    }
};


export const deleteStudentById = async(req, res) => {
    try {
        const student = await findStudentById(req.params.id);

        if (!student){return error(res, "Student tidak ditemukan");}
        await student.destroy()
        return success(res, "Berhasil menghapus student", {} ,204)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error.message });
    }
}

async function findStudentById(id) {
    return await Student.findOne({
        where: {
            student_id: id
        },
        attributes: [
            'student_id',
            'student_name',
            'student_email',
            'student_class',
            'student_grade'
        ]
    });
}