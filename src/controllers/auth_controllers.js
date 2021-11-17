const { connection } = require("../connection");
const { hash } = require("../helpers");
const { createAccessToken } = require("../helpers/token_create");

module.exports = {
    signUp: async (req, res) => {
        const { username, password } = req.body
        const msc = await connection.promise().getConnection()
        try {
            let sql = `select * from user where username = ?`
            let [doesExist] = await msc.query(sql, username)
            if (doesExist.length) {
                msc.release
                return res.status(200).send(doesExist)
            }
            sql = `insert into user set ?`
            const dataSignUp = {
                username,
                password: hash(password)
            }
            let [newUser] = await msc.query(sql, dataSignUp)
            sql = `select * from user where user_id = ?`
            let [result] = await msc.query(sql, newUser.insertId)
            msc.release()
            return res.status(200).send(result)
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    },
    logIn: async (req, res) => {
        const { username, password } = req.body
        const msc = await connection.promise().getConnection()
        try {
            let sql = `select * from user where username = ? and password = ?`
            let [result] = await msc.query(sql, [username, hash(password)])
            if (!result.length) {
                msc.release()
                return res.status(200).send([])
            }
            const accessTokenData = {
                user_id: result[0].user_id,
                username: result[0].username,
                role: result[0].role
            }
            const accessToken = createAccessToken(accessTokenData)
            res.set("access-token", accessToken)
            msc.release()
            return res.status(200).send(result)
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    },
    keepLoggedIn: async (req, res) => {
        const { user_id } = req.user
        const msc = await connection.promise().getConnection()
        try {
            let sql = `select * from user where user_id = ?`
            let [result] = await msc.query(sql, user_id)
            if (!result.length) {
                msc.release()
                return res.status(200).send([])
            }
            msc.release()
            return res.status(200).send(result)
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    }
};


