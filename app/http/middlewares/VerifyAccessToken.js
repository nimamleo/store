const jwt = require("jsonwebtoken");
const creatError = require("http-errors");
const { UserModel } = require("../../models/users.model");
const {
    ACCESS_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_SECRET_KEY,
} = require("../../utils/constant");

function VerifyAccessToken(req, res, next) {
    const headers = req.headers;
    const [bearer, token] = headers?.["access-token"]?.split(" ") || [];
    if (token && ["Bearer", "bearer"].includes(bearer)) {
        jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            if (err) return next(creatError.Unauthorized("please login"));
            const { mobile } = payload || {};
            const user = await UserModel.findOne(
                { mobile },
                { password: 0, otp: 0 }
            );
            if (!user) return next(creatError.Unauthorized("user not found"));
            req.user = user;
            return next();
        });
    } else return next(creatError.Unauthorized("please login"));
}

function VerifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
            if (err) reject(creatError.Unauthorized("please login"));
            const { mobile } = payload || {};
            const user = await UserModel.findOne(
                { mobile },
                { password: 0, otp: 0 }
            );
            if (!user) reject(creatError.Unauthorized("user not found"));
            resolve(mobile);
        });
    });
}
module.exports = {
    VerifyAccessToken,
    VerifyRefreshToken,
};
