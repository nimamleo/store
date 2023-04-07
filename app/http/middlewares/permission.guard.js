const createHttpError = require("http-errors");
const { PermissionModel} = require("../../models/permission.model");
const { RoleModel } = require("../../models/role.model");
const { PERMISSIONS } = require("../../utils/constant");

function checkPermission(requiredPermissions = []) {
    return async function (req, res, next) {
        try {
            const allPermissions = requiredPermissions.flat(2);
            const user = req.user;
            const role = await RoleModel.findOne({ title: user.role });
            const permissions = await PermissionModel.find({
                _id: { $in: role.permissions },
            });
            const userPermissions = permissions.map((item) => item.name);
            if (userPermissions.includes(...PERMISSIONS.SUPERADMIN)) return next();
            const hasPermission = allPermissions.every((permission) => {
                return userPermissions.includes(permission);
            });
            if (allPermissions.length == 0 || hasPermission) return next();
            throw createHttpError.Forbidden(
                "you don't access have to this page access"
            );
        } catch (error) {
            next(error);
        }
    };
}
module.exports = {
    checkPermission,
};
