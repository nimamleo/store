const Controller = require("../../controller");
const path = require("path");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus, StatusCodes } = require("http-status-codes");
const {
    deleteinvalidPropertyInObject,
} = require("../../../../utils/functions");
const { PermissionModel } = require("../../../../models/permission.model");
const { addPermissionSchema } = require("../../../validators/admin/RBAC.schema");

class PermissionController extends Controller {
    async getAllPermissions(req, res, next) {
        try {
            const permissions = await PermissionModel.find({})
            res.status(StatusCodes.OK).json({
                statusCode:StatusCodes.OK,
                data:{permissions}
            })
        } catch (err) {
            next(err);
        }
    }

    async createNewPermission(req, res, next) {
        try {
            const {name , description} =await addPermissionSchema.validateAsync(
                req.body
            );
            await this.findPermission(name);
            const permission = PermissionModel.create({ name, description });
            if (!permission) throw createHttpError.InternalServerError("can not create permission");
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                message: "permission created",
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
}

module.exports = {
    PermissionController: new PermissionController(),
};
