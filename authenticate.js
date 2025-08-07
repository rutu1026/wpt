// authenticate.js

const jwt = require("jsonwebtoken");
const secret_key = '123456789';

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(403).send({ success: false, message: "No token provided" });
    }

    jwt.verify(token, secret_key, (err, decoded) => {
        if (err) {
            return res.status(401).send({ success: false, message: "Invalid token" });
        }

        req.user = decoded;
        next();
    });
};

module.exports = auth;
