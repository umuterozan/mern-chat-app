const jwt = require("jsonwebtoken");
const User = require("../models/User");

function createToken(userId) {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });
}

async function authenticateToken(req, res, next) {
    try {
        const token = req.headers["authorization"] && req.headers["authorization"].split(' ')[1]

        if (!token) {
            return res.status(401).json({
                ok: false,
                err: "No token available",
            })
        }
    
        req.user = await User.findById(
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET).userId
        )
    
        next()
    } catch (err) {
        res.status(401).json({
            ok: false,
            err: "Not authorized"
        })
    }
    
}

module.exports = {
    createToken,
    authenticateToken
}