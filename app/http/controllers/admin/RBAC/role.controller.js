const Controller = require("../../controller");
const path = require("path");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus, StatusCodes } = require("http-status-codes");
const {
    deleteinvalidPropertyInObject,
} = require("../../../../utils/functions");
const { RoleModel } = require("../../../../models/role.model");
const { addRoleSchema } = require("../../../validators/admin/RBAC.schema");
const { default: mongoose } = require("mongoose");

class RoleController extends Controller {
    async getAllRoles(req, res, next) {
        try {
            const roles = await RoleModel.find({}).populate([
                { path: "permissions" },
            ]);
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: { roles },
            });
        } catch (err) {
            next(err);
        }
    }
    async createNewRole(req, res, next) {
        try {
            const { title, permissions, description } =
                await addRoleSchema.validateAsync(req.body);
            await this.findRole(title);
            const role = RoleModel.create({ title, permissions, description });
            if (!role)
                throw createHttpError.InternalServerError(
                    "can not create role"
                );
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                message: "role created",
            });
        } catch (err) {
            next(err);
        }
    }

    async removeRole(req, res, next) {
        try {
            const { field } = req.params;
            const role = await this.findRoleByIdOrTitle(field);
            const removeResult = await RoleModel.deleteOne({ _id: role._id });
            if (removeResult.deletedCount == 0)
                throw createHttpError.InternalServerError(
                    "role could not remove please try again"
                );
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message: "role successfully removed",
            });
        } catch (err) {
            next(err);
        }
    }
    async updateRole(req, res, next) {
        try {
            const { id } = req.params;
            const role = await this.findRoleByIdOrTitle(id);
            const data = req.body;
            const blackListData = [];
            const nulishData = ["", " ", 0, NaN, undefined, null];
            deleteinvalidPropertyInObject(data , blackListData , nulishData)
            const updateResult = await RoleModel.updateOne(
                { _id: role._id },
                { $set: data }
            );
            if (updateResult.deletedCount == 0)
                throw createHttpError.InternalServerError(
                    "role could not update please try again"
                );
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message: "role successfully updated",
            });
        } catch (err) {
            next(err);
        }
    }
    async findRole(title) {
        const role = await RoleModel.findOne({ title });
        if (role)
            throw createHttpError.BadRequest(
                "this role has been already exist"
            );
    }
    async findRoleByIdOrTitle(field) {
        let findQuery = mongoose.isValidObjectId(field)
            ? { _id: field }
            : { title: field };
        console.log(findQuery);
        if (!findQuery)
            throw createHttpError.InternalServerError(
                "field did not send correctly"
            );
        const data = await RoleModel.findOne(findQuery);
        if (!data) throw createHttpError.NotFound("role not found");
        return data;
    }
}

module.exports = {
    RoleController: new RoleController(),
};
