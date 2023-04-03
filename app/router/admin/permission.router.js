const { PermissionController } = require("../../http/controllers/admin/RBAC/permission.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.get("/list" , PermissionController.getAllPermissions)
router.post("/add" , PermissionController.createNewPermission)

module.exports = {
    AdminApiPermissionRouter: router,
};
