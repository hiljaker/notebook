const { connection } = require("../connection");

module.exports = {
    activateUser: async (req, res) => {
        const { user_id } = req.params
        const msc = await connection.promise().getConnection()
        try {
            let sql = `select * from user where user_id = ?`
            let [doesExist] = await msc.query(sql, user_id)
            if (!doesExist.length) {
                msc.release()
                return res.status(200).send([])
            }
            if (doesExist[0].is_suspended === 0) {
                msc.release()
                return res.status(200).send([])
            }
            sql = `update user set ? where user_id = ?`
            const editData = {
                is_suspended: 0
            }
            await msc.query(sql, [editData, user_id])
            msc.release()
            return res.status(200).send({ message: "akun berhasil diaktifkan" })
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    },
    deactivateUser: async (req, res) => {
        const { user_id } = req.params
        const msc = await connection.promise().getConnection()
        try {
            let sql = `select * from user where user_id = ?`
            let [doesExist] = await msc.query(sql, user_id)
            if (!doesExist.length) {
                msc.release()
                return res.status(200).send([])
            }
            if (doesExist[0].is_suspended === 1) {
                msc.release()
                return res.status(200).send([])
            }
            sql = `update user set ? where user_id = ?`
            const editData = {
                is_suspended: 1
            }
            await msc.query(sql, [editData, user_id])
            msc.release()
            return res.status(200).send({ message: "akun berhasil ditangguhkan" })
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    },
    getUsers: async (req, res) => {
        const msc = await connection.promise().getConnection()
        try {
            let sql = `select * from user`
            let [result] = await msc.query(sql)
            msc.release()
            return res.status(200).send(result)
        } catch (error) {
            return res.status(500).send({ message: error.message })
        }
    }
};
