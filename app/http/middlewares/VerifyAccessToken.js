const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { UserModel } = require("../../models/users.model");
const {
    ACCESS_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_SECRET_KEY,
} = require("../../utils/constant");
const redisClient = require("../../utils/init-redis");

function VerifyAccessToken(req, res, next) {
    const headers = req.headers;
    const [bearer, token] = headers?.["access-token"]?.split(" ") || [];
    if (token && ["Bearer", "bearer"].includes(bearer)) {
        jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            if (err) return next(createError.Unauthorized("please login"));
            const { mobile } = payload || {};
            const user = await UserModel.findOne(
                { mobile },
                { password: 0, otp: 0 }
            );
            if (!user) return next(createError.Unauthorized("user not found"));
            req.user = user;
            return next();
        });
    } else return next(createError.Unauthorized("please login"));
}

function VerifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
            if (err) reject(createError.Unauthorized("please login"));
            const { mobile } = payload || {};
            const user = await UserModel.findOne(
                { mobile },
                { password: 0, otp: 0 }
            );
            if (!user) reject(createError.Unauthorized("user not found"));
            const refreshToken = await redisClient.get(String(user?._id));
            if (!refreshToken) reject(createError.Unauthorized("login failed"));
            if (token === refreshToken) return resolve(mobile);
            reject(createError.Unauthorized("login failed"));
        });
    });
}
module.exports = {
    VerifyAccessToken,
    VerifyRefreshToken,
};
