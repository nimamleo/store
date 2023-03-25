const createHttpError = require("http-errors");
const {
    randomNumberGenerator,
    SignAccessToken,
    SignRefreshToken,
} = require("../../../../utils/functions");
const {
    getOtpSchema,
    checkOtpSchema,
} = require("../../../validators/user/auth.schema");
const { UserModel } = require("../../../../models/users.model");
const Controller = require("../../controller");
const { VerifyRefreshToken } = require("../../../../utils/functions");
const { ROLES } = require("../../../../utils/constant");
const { StatusCodes } = require("http-status-codes");

class UserAuthController extends Controller {
    async getOtp(req, res, next) {
        try {
            await getOtpSchema.validateAsync(req.body);
            const { mobile } = req.body;
            const code = randomNumberGenerator();
            const result = await this.saveUser(mobile, code);
            if (!result) throw createHttpError.Unauthorized("login failed");
            return res.status(StatusCodes.OK).send({
                data: {
                    statusCode: StatusCodes.OK,
                    message: "OTP code successfully sent",
                    code,
                    mobile,
                },
            });
        } catch (err) {
            next(err);
        }
    }
    async checkOtp(req, res, next) {
        try {
            await checkOtpSchema.validateAsync(req.body);
            const { mobile, code } = req.body;
            const user = await UserModel.findOne({ mobile });
            if (!user) throw createHttpError.NotFound("user not found");
            if (user.otp.code != code)
                throw createHttpError.Unauthorized(
                    "the sent code is not valid"
                );
            const now = new Date();
            if (+user.otp.expiresIn < now)
                throw createHttpError.Unauthorized("your code is expired");
            const accessToken = await SignAccessToken(user._id);
            const refreshToken = await SignRefreshToken(user._id);
            return res.json({
                data: { accessToken, refreshToken },
            });
        } catch (err) {
            next(err);
        }
    }

    async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const mobile = await VerifyRefreshToken(refreshToken);
            const user = await UserModel.findOne({ mobile });
            const accessToken = await SignAccessToken(user._id);
            const newRefreshToken = await SignRefreshToken(user._id);
            res.json({
                accessToken,
                refreshToken: newRefreshToken,
            });
        } catch (err) {
            next(err);
        }
    }
    async saveUser(mobile, code) {
        let otp = {
            code,
            expiresIn: new Date().getTime() + 120000,
        };
        const result = await this.checkExistUser(mobile);
        if (result) {
            return await this.updateuser(mobile, { otp });
        }
        return !!(await UserModel.create({
            mobile,
            otp,
            roles: [ROLES.USER],
        }));
    }
    async checkExistUser(mobile) {
        const user = await UserModel.findOne({ mobile });
        return !!user;
    }
    async updateuser(mobile, objectData = {}) {
        Object.keys(objectData).forEach((key) => {
            if (["", " ", null, undefined, NaN].includes(objectData[key]))
                delete objectData[key];
        });
        const updateResult = await UserModel.updateOne(
            { mobile },
            { $set: objectData }
        );
        return !!updateResult.modifiedCount;
    }
}

module.exports = {
    UserAuthController: new UserAuthController(),
};
