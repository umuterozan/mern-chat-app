const jwt = require("jsonwebtoken");
const User = require("../models/User");

function createToken(userId) {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10s",
    });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "48h",
    })

    return {
        accessToken,
        refreshToken
    }
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
            err: err.name === "TokenExpiredError" ? "Token expired" : "Not authorized"
        })
    }
}

function refreshToken (req, res, next) {
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
        if (err) {
            res.status(401).json({
                ok: false,
                err: err.message,
            })
        } else {
            const accessToken = jwt.sign({ userId: decode.userId }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "20s"
            })
            const refreshToken = req.body.refreshToken
            res.status(200).json({
                ok: true,
                accessToken,
                refreshToken,
            })
        }
    })
}

module.exports = {
    createToken,
    authenticateToken,
    refreshToken,
}