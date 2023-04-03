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
            expiresIn: "4h",
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

function copyObject(object) {
    return JSON.parse(JSON.stringify(object));
}

function setFeatures(body) {
    const { width, height, weight, length, colors } = body;
    let features = {},
        type = "physical";
    features.colors = colors;
    if (
        !isNaN(+width) ||
        !isNaN(+height) ||
        !isNaN(+weight) ||
        !isNaN(+length)
    ) {
        if (!width) features.width = 0;
        else features.width = +width;
        if (!height) features.height = 0;
        else features.height = +height;
        if (!weight) features.weight = 0;
        else features.weight = +weight;
        if (!length) features.length = 0;
        else features.length = +length;
    } else {
        type = "virtual";
    }

    return features;
}

function deleteinvalidPropertyInObject(
    data = {},
    blackListData = [],
    nullishData = []
) {
    Object.keys(data).forEach((key) => {
        if (blackListData.includes(data[key])) {
            console.log(key);
            delete data[key];
        }
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && data[key].length > 0)
            data[key] = data[key].map((item) => item.trim());
        if (Array.isArray(data[key]) && data[key].length == 0) delete data[key];
        if (nullishData.includes(data[key])) delete data[key];
    });
}

function getTime(seconds) {
    return new Date(seconds * 1000).toISOString().substring(11, 19);
}

function getTimeOfCourse(chapters = []) {
    let time,
        second = 0;
    for (const chapter of chapters) {
        for (const episode of chapter.episodes) {
            if (episode?.time) {
                [hour, min, sec] = episode.time.split(":");
                hour = hour * 3600;
                min = min * 60;
                second += +hour + min + +sec;
                time = getTime(second);
            } else {
                time = "00:00:00";
            }
        }
    }
    return time;
}
module.exports = {
    randomNumberGenerator,
    SignAccessToken,
    SignRefreshToken,
    deleteFileInPublic,
    VerifyRefreshToken,
    ListOfImagesFromRequest,
    copyObject,
    setFeatures,
    deleteinvalidPropertyInObject,
    getTime,
    getTimeOfCourse,
};
