import Users from "../models/UserModel.js";
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken";

export const register = async(req, res) => {
    const {name, jenis_pengguna, nik, password, conf_password} = req.body;
    if(password !== conf_password) return res.status(400).json({msg: "password dan confirmation password tidak cocok"})
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            jenis_pengguna: jenis_pengguna,
            nik: nik,
            password: hashPassword
        })
        res.status(200).json({msg: "Register Berhasil"})
    } catch (error) {
        console.log(error)
    }
}

export const login = async(req, res) => {
    try {
        const user = await Users.findAll({
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
}