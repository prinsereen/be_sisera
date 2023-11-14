import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await Users.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const name = user[0].name;
            const jenis_pengguna = user[0].jenis_pengguna;
            const nik = user[0].nik;
            const accessToken = jwt.sign({userId, name, jenis_pengguna, nik}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '60s'
            });
            res.json({accessToken})
        })
    } catch (error) {
        console.log(error)
    }
}