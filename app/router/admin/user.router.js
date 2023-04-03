const {
    UserController
} = require("../../http/controllers/admin/user/user.controller");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.get("/list", UserController.getAllUsers);
router.patch("/update-profile", UserController.updateUserProfile);

module.exports = {
    AdminApiUserRouter: router,
};
