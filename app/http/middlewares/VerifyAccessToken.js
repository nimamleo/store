const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
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
            if (err) return next(createHttpError.Unauthorized("please login"));
            const { mobile } = payload || {};
            const user = await UserModel.findOne(
                { mobile },
                { password: 0, otp: 0 }
            );
            if (!user)
                return next(createHttpError.Unauthorized("user not found"));
            req.user = user;
            return next();
        });
    } else return next(createHttpError.Unauthorized("please login"));
}

module.exports = {
    VerifyAccessToken,
};
