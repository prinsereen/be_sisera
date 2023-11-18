import { check, validationResult } from "express-validator";
import Student from "../models/StudentModel.js";

export const Register = [
    check('student_name').isLength({ min: 1 }).withMessage('tidak boleh kosong'),
    check('student_password').isLength({ min: 1 }).withMessage('tidak boleh kosong'),
    check('student_nisn').isLength({ min: 1 }).withMessage('tidak boleh kosong')
    .custom(async (nisn, { req }) => {
        const existingNisn = await Student.findOne({
            where: { student_nisn: nisn }
        });
        if (existingNisn) {
            throw new Error('user sudah terdaftar');
        }
    }),
    check('student_email').isEmail().withMessage('format tidak sesuai')
    .custom(async (email, { req }) => {
        const existingEmail = await Student.findOne({
            where: { student_email: email }
        });
        if (existingEmail) {
            throw new Error('user sudah terdaftar');
        }
    }),
    check('student_conf_password').custom(async (confPassword, { req }) => {
        const { student_password } = req.body;
        if (student_password !== await confPassword) {
            throw new Error('password dan confirmation password tidak cocok');
        }
    })
    
];

export const Login = [
    check('student_name').isLength({ min: 1 }).withMessage('tidak boleh kosong'),
    check('student_nisn').isLength({ min: 1 }).withMessage('tidak boleh kosong'),
    check('student_password').isLength({ min: 1 }).withMessage('tidak boleh kosong'),
    check('student_email').isEmail().withMessage('format tidak sesuai')
]