const productController = require("../../http/controllers/admin/product/product.controller");
const {
    ProductController,
} = require("../../http/controllers/admin/product/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.get("/list", ProductController.getAllProducts);

router.get("/:id", ProductController.getOneProduct);

router.post(
    "/add",
    uploadFile.array("images", 10),

    stringToArray("tags"),
    ProductController.addProduct
);

router.patch(
    "/edit/:id",
    uploadFile.array("images", 10),
    stringToArray("tags", "colors"),
    ProductController.editProduct
);

router.delete("/remove/:id", ProductController.removeProduct);

module.exports = {
    AdminApiProductRouter: router,
};
