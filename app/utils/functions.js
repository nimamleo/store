const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { UserModel } = require("../models/users.model");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constant");
function randomNumberGenerator() {
    return Math.floor(Math.random() * 90000 + 10000);
}

function SignAccessToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId);
        const payload = {
            mobile: user.mobile,
        };
        const options = {
            expiresIn: "1h",
        };
        jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
            if (err) reject(createError.InternalServerError("server error"));
            resolve(token);
        });
    });
}
function SignRefreshToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId);
        const payload = {
            mobile: user.mobile,
        };
        const options = {
            expiresIn: "1y",
        };
        jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, (err, token) => {
            if (err) reject(createError.InternalServerError("server error"));
            resolve(token);
        });
    });
}

module.exports = {
    randomNumberGenerator,
    SignAccessToken,
    SignRefreshToken
};
