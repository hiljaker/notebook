const jwt = require('jsonwebtoken');

module.exports = {
    verifyAccessToken: (req, res, next) => {
        const token = req.token
        const key = "avocado"
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "user unauthorized" })
            }
            req.user = decoded
            next()
        })
    }
};
