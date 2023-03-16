const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const path = require("path");
const { UserModel } = require("../models/users.model");
const {
    ACCESS_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_SECRET_KEY,
} = require("./constant");
const redisClient = require("./init-redis");
const fs = require("fs");

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
            if (err)
                reject(createHttpError.InternalServerError("server error"));
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
        jwt.sign(
            payload,
            REFRESH_TOKEN_SECRET_KEY,
            options,
            async (err, token) => {
                if (err)
                    reject(createHttpError.InternalServerError("server error"));
                await redisClient.SETEX(
                    String(userId),
                    365 * 24 * 60 * 60,
                    token
                );
                resolve(token);
            }
        );
    });
}

function VerifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
            if (err) reject(createHttpError.Unauthorized("please login"));
            const { mobile } = payload || {};
            const user = await UserModel.findOne(
                { mobile },
                { password: 0, otp: 0 }
            );
            if (!user) reject(createHttpError.Unauthorized("user not found"));
            const refreshToken = await redisClient.get(
                String(user?._id || "key_default")
            );
            if (!refreshToken)
                reject(createHttpError.Unauthorized("login failed"));
            if (token === refreshToken) return resolve(mobile);
            reject(createHttpError.Unauthorized("login failed"));
        });
    });
}

function deleteFileInPublic(fileAddress = "null.png") {
    if (fileAddress) {
        const pathFile = path.join(
            __dirname,
            "..",
            "..",
            "public",
            fileAddress
        );
        if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
    }
}

function ListOfImagesFromRequest(files, fileUploadPath) {
    if (files?.length > 0) {
        return files
            .map((file) => path.join(fileUploadPath, file.filename))
            .map((item) => item.split("\\").join("/"));
    } else {
        return [];
    }
}

module.exports = {
    randomNumberGenerator,
    SignAccessToken,
    SignRefreshToken,
    deleteFileInPublic,
    VerifyRefreshToken,
    ListOfImagesFromRequest,
};
