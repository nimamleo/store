const Controller = require("../../controller");
const path = require("path");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus, StatusCodes } = require("http-status-codes");
const {
    deleteinvalidPropertyInObject,
} = require("../../../../utils/functions");
const { PermissionModel } = require("../../../../models/permission.model");
const {
    addPermissionSchema,
} = require("../../../validators/admin/RBAC.schema");

class PermissionController extends Controller {
    async getAllPermissions(req, res, next) {
        try {
            const permissions = await PermissionModel.find({});
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: { permissions },
            });
        } catch (err) {
            next(err);
        }
    }

    async createNewPermission(req, res, next) {
        try {
            const { name, description } =
                await addPermissionSchema.validateAsync(req.body);
            await this.findPermission(name);
            const permission = PermissionModel.create({ name, description });
            if (!permission)
                throw createHttpError.InternalServerError(
                    "can not create permission"
                );
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                message: "permission created",
            });
        } catch (err) {
            next(err);
        }
    }
    async removePermission(req, res, next) {
        try {
            const { id } = req.params;
            await this.findPermissionById(id);
            const removeResult = await PermissionModel.deleteOne({ _id: id });

            if (removeResult.deletedCount == 0)
                throw createHttpError.InternalServerError(
                    "could not delete permission please try again"
                );
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message: "permission removed",
            });
        } catch (err) {
            next(err);
        }
    }
    async updatePermission(req, res, next) {
        try {
            const { id } = req.params;
            const permission = await this.findPermissionById(id);
            const data = req.body;
            const blackListData = [];
            const nulishData = ["", " ", 0, NaN, undefined, null];
            deleteinvalidPropertyInObject(data, blackListData, nulishData);
            const updateResult = await PermissionModel.updateOne(
                { _id: permission._id },
                { $set: data }
            );
            if (updateResult.deletedCount == 0)
                throw createHttpError.InternalServerError(
                    "permission could not update please try again"
                );
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message: "permission  successfully updated",
            });
        } catch (err) {
            next(err);
        }
    }
    async findPermission(name) {
        const data = await PermissionModel.findOne({ name });
        if (data)
            throw createHttpError.BadRequest(
                "this permission has been already exist"
            );
        return data;
    }
    async findPermissionById(id) {
        const data = await PermissionModel.findOne({ _id: id });
        if (!data) throw createHttpError.NotFound("permission not found");
        return data;
    }
}

module.exports = {
    PermissionController: new PermissionController(),
};
