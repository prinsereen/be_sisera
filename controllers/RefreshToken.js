import jwt from "jsonwebtoken";
import Student from "../models/StudentModel.js";

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await Student.findOne({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);

            const Id = user.id;
            const Name = user.name;
            const Email = user.email;

        const accessToken = jwt.sign({Id, Name, Email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d'
        });
            res.json({accessToken})
        })
    } catch (error) {
        console.log(error)
    }
}