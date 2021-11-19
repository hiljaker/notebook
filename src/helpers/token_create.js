const jwt = require('jsonwebtoken');

module.exports = {
    createAccessToken: (data) => {
        const key = "avocado"
        const token = jwt.sign(data, key, { expiresIn: "12h" })
        return token
    }
};
