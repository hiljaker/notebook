const { connection } = require("../connection");

module.exports = {
    addContent: async (req, res) => {
        const { title, content } = req.body
        const { user_id } = req.params
        const msc = await connection.promise().getConnection()
        try {
            let sql = `insert into content set ?`
            const contentData = {
                title,
                content,
                user_id
            }
            let [newContent] = await msc.query(sql, contentData)
            sql = `select * from content where content_id = ?`
            let [result] = await msc.query(sql, newContent.insertId)
            msc.release()
            return res.status(200).send(result)
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    },
    moveToTrash: async (req, res) => {
        const { content_id } = req.params
        const msc = await connection.promise().getConnection()
        try {
            let sql = `select * from content where content_id = ?`
            let [doesExist] = await msc.query(sql, content_id)
            if (!doesExist.length) {
                msc.release()
                return res.status(200).send([])
            }
            sql = `update content set ? where content_id = ?`
            const editData = {
                is_deleted: 1
            }
            await msc.query(sql, [editData, content_id])
            msc.release()
            return res.status(200).send({ message: "added to trash" })
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    },
    restoreContent: async (req, res) => {
        const { content_id } = req.params
        const msc = await connection.promise().getConnection()
        try {
            let sql = `select * from content where content_id = ?`
            let [doesExist] = await msc.query(sql, content_id)
            if (!doesExist.length) {
                msc.release()
                return res.status(200).send([])
            }
            sql = `update content set ? where content_id = ?`
            const editData = {
                is_deleted: 0
            }
            await msc.query(sql, [editData, content_id])
            msc.release()
            return res.status(200).send({ message: "restore success" })
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    },
    deleteContent: async (req, res) => {
        const { content_id } = req.params
        const msc = await connection.promise().getConnection()
        try {
            let sql = `select * from content where content_id = ?`
            let [doesExist] = await msc.query(sql, content_id)
            if (!doesExist.length) {
                msc.release()
                return res.status(200).send([])
            }
            sql = `update content set ? where content_id = ?`
            const editData = {
                is_deleted: 2
            }
            await msc.query(sql, [editData, content_id])
            msc.release()
            return res.status(200).send({ message: "delete success" })
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    },
    editContent: async (req, res) => {
        const { title, content } = req.body
        const { content_id } = req.params
        const msc = await connection.promise().getConnection()
        try {
            let sql = `select * from content where content_id = ?`
            let [doesExist] = await msc.query(sql, content_id)
            if (!doesExist.length) {
                msc.release()
                return res.status(200).send([])
            }
            sql = `update content set ? where content_id = ?`
            const contentData = {
                title,
                content
            }
            await msc.query(sql, [contentData, content_id])
            msc.release()
            return res.status(200).send({ message: "edit success" })
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    },
    getContents: async (req, res) => {
        const { user_id } = req.params
        const msc = await connection.promise().getConnection()
        try {
            let sql = `select * from content where user_id = ?`
            let [result] = await msc.query(sql, user_id)
            msc.release()
            return res.status(200).send(result)
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    },
    getTrash: async (req, res) => {
        const { user_id } = req.params
        const msc = await connection.promise().getConnection()
        try {
            let sql = `select * from content where user_id = ? and is_deleted = ?`
            let [result] = await msc.query(sql, [user_id, 1])
            msc.release()
            return res.status(200).send(result)
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    }
};
