import Tesseract from "tesseract.js";
import MasterDasar from "../models/MasterDataDasarModel.js";
import { success, error } from "../lib/Responser.js";

export const recognize = async(req, res) => {
    const {imgPath, task_id} = req.body; 

    try {
        const isMatch = await MasterDasar.findOne({
            where: {
                id: task_id
            }
        });

        Tesseract.recognize(imgPath, 'eng')
            .then(({ data: { text } }) => {
                const result = (text.toLowerCase().trim() === isMatch.value.toLowerCase().trim());
                if (result) {
                    return success(res, "Anda Benar!!", result);
                }
                return error(res, "Salah cuy", result);
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (error) {
        console.log(error);
    }
}
