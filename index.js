import express from "express"
import db from "./config/Database.js";
import Student from "./models/StudentModel.js";
import MasterDasar from "./models/MasterDataDasarModel.js";
import MasterAdvanced from "./models/MasterDataAdvanced.js";
import Tahapan from "./models/TahapanModel.js";
import Video from "./models/VideoModel.js";
import CeritaCard from "./models/CeritaCardModel.js";
import bodyParser from "body-parser";
import AuthRoute from "./routes/AuthRoute.js"
import MasterDasarRoute from "./routes/MasterDasarRoute.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import StudentRoute from "./routes/StudentRoute.js"

dotenv.config();

const app = express();

try {
    await db.authenticate();
    console.log("Database Connected ...")
    //await db.sync()
} catch (error) {
    console.log(error)
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser())
app.use(express.json())
app.use(AuthRoute)
app.use(StudentRoute)
app.use(MasterDasarRoute)

app.listen(5000, ()=> console.log("server running on port 5000"))