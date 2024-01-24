import MasterAdvanced from "../models/MasterDataAdvanced.js";
import Tahapan from "../models/TahapanModel.js";
import Video from "../models/VideoModel.js";
import CeritaCard from "../models/CeritaCardModel.js";
import { success, error } from "../lib/Responser.js";

export const createMasterAdvaced = async(req, res) => {
    
    const { level, jenis, sub_jenis,  assets_1, assets_2, assets_3, video_path} = req.body;

    try {
        const newMasterAdvanced = await MasterAdvanced.create({
            level,
            jenis,
            sub_jenis
        });
        const newId = newMasterAdvanced.id;
        await Tahapan.create({
            data_advaced_id: newId,
            assets_1,
            assets_2,
            assets_3
        })
        await Video.create({
            data_advaced_id: newId,
            video_path
        })
        
        const dataResponse = {id: newMasterAdvanced.id, level, jenis, sub_jenis, assets_1, assets_2, assets_3, video_path}
        return success(res, "Berhasil Menambahkan Master Advanced", dataResponse);
    } catch (e) {
        console.log(e)
    }
} 

export const createCeritaCard = async(req, res) => {
    
    const {master_id, gambar_path , audio_path } = req.body;

    try {
        const newCeritaCard = await CeritaCard.create({
            data_advaced_id: master_id,
            gambar_path,
            audio_path
        })
        return success(res, "Berhasil Membuat Cerita Card", newCeritaCard)
    } catch (e) {
        console.log(e)
    }
}