
export const getAllUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes: [
            'id', 
            'jenis_pengguna', 
            'nik',
            'riwayat_penyakit',
            'riwayat_alergi',
            'berat_badan',
            'tinggi_badan',
            'tekanan_darah',
            'denyut_jantung',
            'catatan_tambahan'
        ]
        });
        res.json(users)
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUserById = async(req, res) => {
    try {
        const user = await Users.findOne({
        attributes: [
            'id', 
            'jenis_pengguna', 
            'nik',
            'riwayat_penyakit',
            'riwayat_alergi',
            'berat_badan',
            'tinggi_badan',
            'tekanan_darah',
            'denyut_jantung',
            'catatan_tambahan'
        ], 
            where: {
                id: req.params.id 
            }
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

