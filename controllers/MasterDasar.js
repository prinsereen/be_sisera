import {success, error} from "../lib/Responser.js"
import MasterDasar from "../models/MasterDataDasarModel.js"

export const createMasterDasar = async(req, res) => {
    const {jenis, sub_jenis, level , value, file_path} = req.body;
    try {        
        const data = await MasterDasar.create({
          level,
          jenis,
          sub_jenis,
          value,
          file_path
        });
        return success(res, "Berhasil Menambahkan Master Data Dasar", data);
    } catch (error) {
        console.log(error)
    }
}

export const getMasterDasar = async(req, res) => {
    try {
        const masterDasars = await MasterDasar.findAll({
            attributes:[
              'id',
              'level',
              'jenis',
              'sub_jenis',
              'value',
              'file_path'
            ]
        })
        return success(res, "Berhasil Mendapatkan Semua Master Data Dasar", masterDasars)
    } catch (error) {
        console.log(error)
    }
}

export const getQueryMasterDasar = async (req, res) => {
    const { id, jenis, sub_jenis, value, level } = req.query;
    let whereCondition = {};
  
    if (id) {
      whereCondition.id = id;
    }
  
    if (jenis) {
      whereCondition.jenis = jenis;
    }

    if (sub_jenis) {
      whereCondition.sub_jenis = sub_jenis;
    }
  
    if (value) {
      whereCondition.value = value;
    }

    if (level) {
      whereCondition.level = level;
    }
  
    try {
      const data = await MasterDasar.findAll({
        where: whereCondition,
        attributes: ["id","level","jenis", "sub_jenis", "value", "file_path"],
      });
  
      if (data.length > 0) {
        return success(res, "Berhasil Mendapatkan Master Data Dasar", data);
      } else {
        return success(res, "Data tidak ditemukan", null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  