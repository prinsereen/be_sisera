import Student from "../models/StudentModel.js";
import {success, error} from "../lib/Responser.js"
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken";

export const register = async(req, res) => {
    const {name, email, password, conf_password} = req.body;

    try {
        if (password != conf_password){
            return error(res, "Password dan Confirmation Password tidak sama")
        }

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const newStudent = await Student.create({
            name,
            email,
            password: hashPassword
        });
        
        return success(res, "Berhasil Register", newStudent);
        
    } catch (error) {
        console.log(error)
    }
}

export const login = async(req, res) => {
    try {

        const {email, password} = req.body;

        const user = await Student.findOne({
            where:{
                email
            }
        })

        const match = await bcrypt.compare(password, user.password);
        if(!match) return error(res, "Wrong Password")


        const Id = user.id;
        const Name = user.name;
        const Email = user.email;

        const accessToken = jwt.sign({Id, Name, Email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        const refreshToken = jwt.sign({Id, Name, Email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await Student.update({refresh_token: refreshToken}, {
            where: {
                email
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

export const me = async (req, res) => {
    try {
        const {user} = req
  
      if (!user) {
        return error(res, "User not found");
      }
  
      const userData = {
        id: user.Id,
        name: user.Name,
        email: user.Email,
      };
  
      return success(res, "User details retrieved successfully", userData);
    } catch (error) {
      console.log(error);
      res.status(404).json({msg: "Unable to fetch user details"})
    }
  };

export const logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Student.findOne({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user) return res.sendStatus(204);
    const email = user.email;
    await Student.update({refresh_token: null},{
        where:{
            email: email
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200)
}