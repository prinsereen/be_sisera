import Student from "../models/StudentModel.js";
import {success, error} from "../lib/Responser.js"

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
        return success(res, "Berhasil mendapatkan data student", student);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

