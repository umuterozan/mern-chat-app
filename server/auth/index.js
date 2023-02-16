const jwt = require("jsonwebtoken");
const User = require("../models/User");

function createToken(userId) {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3d",
    });
    const refreshToken = jwt.sign(
        { userId },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "7d",
        }
    );

    return {
        accessToken,
        refreshToken,
    };
}

async function authenticateToken(req, res, next) {
    try {
        const token =
            req.headers["authorization"] &&
            req.headers["authorization"].split(" ")[1];

        if (!token) {
            return res.status(401).json({
                ok: false,
                err: "No token available",
            });
        }

        req.user = await User.findById(
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET).userId
        );

        next();
    } catch (err) {
        res.status(401).json({
            ok: false,
            err:
                err.name === "TokenExpiredError"
                    ? "Token expired"
                    : "Not authorized",
        });
    }
}

function refreshToken(req, res, next) {
    try {
        const refreshToken = req.body.refreshToken;
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        ok: false,
                        err: err.message,
                    });
                }

                const userId = decoded.userId;

                const accessToken = jwt.sign(
                    { userId },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "3d",
                    }
                );

                const newRefreshToken = jwt.sign(
                    { userId },
                    process.env.REFRESH_TOKEN_SECRET,
                    {
                        expiresIn: "7d",
                    }
                );

                res.status(200).json({
                    ok: true,
                    accessToken,
                    refreshToken: newRefreshToken,
                });
            }
        );

        next();
    } catch (err) {
        res.status(403).json({
            ok: false,
            err: err.message,
        });
    }
}

module.exports = {
    createToken,
    authenticateToken,
    refreshToken,
};
