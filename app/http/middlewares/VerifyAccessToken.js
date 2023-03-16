const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const { UserModel } = require("../../models/users.model");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constant");

function getToken(headers) {
    const [bearer, token] = headers?.authorization?.split(" ") || [];
    if (token && ["Bearer", "bearer"].includes(bearer)) return token;
    throw createHttpError.Unauthorized(
        "can not find account please login again"
    );
}

function VerifyAccessToken(req, res, next) {
    try {
        const token = getToken(req.headers);
        jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            try {
                if (err)
                    throw next(createHttpError.Unauthorized("please login"));
                const { mobile } = payload || {};
                const user = await UserModel.findOne(
                    { mobile },
                    { password: 0, otp: 0 }
                );
                if (!user)
                    return next(createHttpError.Unauthorized("user not found"));
                req.user = user;
                return next();
            } catch (err) {
                next(err);
            }
        });
    } catch (err) {
        next(err);
    }
}

function checkRole(role) {
    try {
        return function (req, res, next) {
            const user = req.user;
            if (user.roles.includes(role)) return next();
            throw createHttpError.Forbidden(
                "you don't have to this page access"
            );
        };
    } catch (err) {
        next(err);
    }
}

module.exports = {
    VerifyAccessToken,
    checkRole,
};
