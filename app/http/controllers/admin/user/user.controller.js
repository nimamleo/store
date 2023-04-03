const Controller = require("../../controller");
const path = require("path");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus, StatusCodes } = require("http-status-codes");
const { UserModel } = require("../../../../models/users.model");
const {
    deleteinvalidPropertyInObject,
} = require("../../../../utils/functions");

class UserController extends Controller {
    async getAllUsers(req, res, next) {
        try {
            const { search } = req.query;
            const dbQuery = {};
            if (search) dbQuery["$text"] = { $search: search };
            const users = await UserModel.find(dbQuery);
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: { users },
            });
        } catch (err) {
            next(err);
        }
    }
    async updateUserProfile(req, res, next) {
        try {
            const userId = req.user._id;
            const data = req.body;
            const blackListData = [
                "mobile",
                "otp",
                "discount",
                "roles",
                "courses",
            ];
            const nulishData = ["", " ", undefined, null, NaN, 0];
            deleteinvalidPropertyInObject(data, blackListData, nulishData);
            const updateResult = await UserModel.updateOne(
                { _id: userId },
                { $set: data }
            );
            if (updateResult.modifiedCount == 0)
                throw createHttpError.BadRequest("update user profile failed");
            return res
                .status(StatusCodes.OK)
                .json({
                    message: "user profile updated",
                    statusCode: StatusCodes.OK,
                });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = {
    UserController: new UserController(),
};
