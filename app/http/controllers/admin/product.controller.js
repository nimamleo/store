const Controller = require("../controller");
const { addProductSchema } = require("../../validators/admin/product.schema");
const { ProductModel } = require("../../../models/product.model");
const path = require("path");
const { ListOfImagesFromRequest } = require("../../../utils/functions");
const { ObjectIdValidator } = require("../../validators/public.validator");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");

class ProductController extends Controller {
    async addProduct(req, res, next) {
        try {
            const images = ListOfImagesFromRequest(
                req?.files || [],
                req.body.fileUploadPath
            );
            const productBody = await addProductSchema.validateAsync(req.body);
            const {
                title,
                text,
                short_text,
                category,
                tags,
                count,
                price,
                discount,
                width,
                height,
                weight,
                length,
            } = productBody;
            const supplier = req.user._id;

            let feture = {},
                type = "physical";
            if (
                !isNaN(+width) ||
                !isNaN(+height) ||
                !isNaN(+weight) ||
                !isNaN(+length)
            ) {
                if (!width) feture.width = 0;
                else feture.width = +width;
                if (!height) feture.height = 0;
                else feture.height = +height;
                if (!weight) feture.weight = 0;
                else feture.weight = +weight;
                if (!length) feture.length = 0;
                else feture.length = +length;
            } else {
                type = "virtual";
            }
            console.log(feture);

            const product = await ProductModel.create({
                title,
                text,
                short_text,
                category,
                tags,
                count,
                price,
                discount,
                images,
                feture,
                supplier,
                type,
            });

            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                message: "product created",
                data: {
                    product,
                },
            });
        } catch (err) {
            next(err);
        }
    }
    async editProduct(req, res, next) {
        try {
        } catch (err) {
            deleteFileInPublic(req.body.image);
            next(err);
        }
    }
    async removeProduct(req, res, next) {
        try {
            const { id } = req.params;
            const product = await this.findProduct(id);
            const deleteResult = await ProductModel.deleteOne({
                _id: product._id,
            });
            if (deleteResult.deletedCount == 0)
                throw createHttpError.InternalServerError("delete failed");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                message: "product delete successfully",
            });
        } catch (err) {
            next(err);
        }
    }
    async getAllProducts(req, res, next) {
        try {
            const search = req?.query?.search || "";
            let products;
            if (search) {
                products = await ProductModel.find({
                    $text: {
                        $search: new RegExp(search, "ig"),
                    },
                });
            } else {
                products = await ProductModel.find({});
            }
            res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: { products },
            });
        } catch (err) {
            next(err);
        }
    }
    async getOneProduct(req, res, next) {
        try {
            const { id } = req.params;
            const product = await this.findProduct(id);
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: { product },
            });
        } catch (err) {
            next(err);
        }
    }

    async findProduct(productId) {
        const { id } = await ObjectIdValidator.validateAsync({ id: productId });
        const prodcut = await ProductModel.findById(id);
        if (!prodcut) throw createHttpError.NotFound("can not find product");
        return prodcut;
    }
}

module.exports = {
    ProductController: new ProductController(),
};
