const Controller = require("../../controller");
const { addProductSchema } = require("../../../validators/admin/product.schema");
const { ProductModel } = require("../../../../models/product.model");
const path = require("path");
const {
    ListOfImagesFromRequest,
    copyObject,
    setFeatures,
    deleteinvalidPropertyInObject,
} = require("../../../../utils/functions");
const { ObjectIdValidator } = require("../../../validators/public.validator");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const ProductBlackList = {
    BOOKMARKS: "bookmarks",
    LIKES: "likes",
    DISLIKES: "dislikes",
    COMMENTS: "comments",
    SUPPLIER: "supplier",
    WEIGHT: "weight",
    WIDTH: "width",
    LENGTH: "length",
    HEIGHT: "height",
    COLORS: "colors",
};
Object.freeze(ProductBlackList);

const nullishList = {
    EMPTY: "",
    WHITESPACE: " ",
    UNDEFINED: undefined,
    NULL: null,
    NAN: NaN,
    ZERO: 0,
};
Object.freeze(nullishList);

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
            } = productBody;
            const supplier = req.user._id;

            let features = setFeatures(req.body);

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
                features,
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
            const { id } = req.params;
            const product = await this.findProduct(id);
            const data = copyObject(req.body);
            data.images = ListOfImagesFromRequest(
                req?.files || [],
                req.body.fileUploadPath
            );
            data.features = setFeatures(req.body);
            const blackListData = Object.values(ProductBlackList);
            const nulishData = Object.values(nullishList);
            deleteinvalidPropertyInObject(data, blackListData, nulishData);

            const updateResult = await ProductModel.updateOne(
                { _id: product._id },
                { $set: data }
            );
            if (updateResult.modifiedCount == 0) {
                throw createHttpError.InternalServerError(
                    "product update failed"
                );
            }
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                message: "product updated",
            }); 
        } catch (err) {
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
