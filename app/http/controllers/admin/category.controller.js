const { CategoryModel } = require("../../../models/categories.model");
const Controller = require("../controller");
const createHttpError = require("http-errors");
const {
    addCategorySchema,
    updateCategorySchema,
} = require("../../validators/admin/category.schema");
const { default: mongoose } = require("mongoose");

class CategoryController extends Controller {
    async addCategory(req, res, next) {
        try {
            await addCategorySchema.validateAsync(req.body);
            const { title, parent } = req.body;
            const category = await CategoryModel.create({ title, parent });
            if (!category)
                throw createHttpError.InternalServerError(
                    "internall server error"
                );
            return res.status(201).json({
                data: {
                    statusCode: 201,
                    message: "category successfully added",
                },
            });
        } catch (err) {
            next(err);
        }
    }
    async removeCategory(req, res, next) {
        try {
            const { id } = req.params;
            const category = await this.checkExistsCategory(id);
            const deleteResult = await CategoryModel.deleteMany({
                $or: [{ _id: category._id }, { parent: category._id }],
            });
            if (deleteResult.deletedCount == 0)
                throw createHttpError.InternalServerError(
                    "can not remove category"
                );
            return res.status(200).json({
                statusCode: 200,
                data: {
                    message: "category removed",
                },
            });
        } catch (err) {
            next(err);
        }
    }
    async editCategory(req, res, next) {
        try {
            const { id } = req.params;
            const { title } = req.body;
            this.checkExistsCategory(id);
            await updateCategorySchema.validateAsync(req.body);
            const updateResult = await CategoryModel.updateOne(
                { _id: id },
                { $set: { title } }
            );
            if (updateResult.modifiedCount == 0)
                throw createHttpError.InternalServerError("can not update");
            return res.status(200).json({
                statusCode: 200,
                message: "update successfully done",
            });
        } catch (err) {
            next(err);
        }
    }
    async getAllcategoryWithoutPopulate(req, res, next) {
        try {
            const catogories = await CategoryModel.aggregate([{ $match: {} }]);
            return res.status(200).json({
                data: { catogories },
            });
        } catch (err) {
            next(err);
        }
    }
    async getAllCategory(req, res, next) {
        try {
            // const category = await CategoryModel.aggregate([
            //     {
            //         $lookup: {
            //             from: "categories",
            //             localField: "_id",
            //             foreignField: "parent",
            //             as: "children",
            //         },
            //     },
            //     {
            //         $project: {
            //             __v: 0,
            //             "children.__v": 0,
            //             "children.parent": 0,
            //         },
            //     },
            //     {
            //         $match: { parent: undefined },
            //     },
            // ]);
            // const categories = await CategoryModel.aggregate([
            //     {
            //         $graphLookup: {
            //             from: "categories",
            //             startWith: "$_id",
            //             connectFromField: "_id",
            //             connectToField: "parent",
            //             maxDepth: 5,
            //             depthField: "depth",
            //             as: "children",
            //         },
            //     },
            //     {
            //         $project: {
            //             __v: 0,
            //             "children.__v": 0,
            //             "children.parent": 0,
            //         },
            //     },
            //     {
            //         $match: { parent: undefined },
            //     },
            // ]);
            const categories = await CategoryModel.find(
                { parent: undefined },
                { __v: 0 }
            );
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    categories,
                },
            });
        } catch (err) {
            next(err);
        }
    }
    async getCategoryById(req, res, next) {
        try {
            const { id: _id } = req.params;
            const category = await CategoryModel.aggregate([
                {
                    $match: { _id: new mongoose.Types.ObjectId(_id) },
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "_id",
                        foreignField: "parent",
                        as: "children",
                    },
                },
                {
                    $project: {
                        __v: 0,
                        "children.__v": 0,
                        "children.parent": 0,
                    },
                },
            ]);
            return res.status(200).json({
                data: { category },
            });
        } catch (err) {
            next(err);
        }
    }
    async getAllParents(req, res, next) {
        try {
            const parents = await CategoryModel.find(
                { parent: undefined },
                { __v: 0 }
            );
            if (!parents)
                throw createHttpError.NotFound("there is no category");
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    parents,
                },
            });
        } catch (err) {
            next(err);
        }
    }
    async getChildOfParents(req, res, next) {
        try {
            const { parent } = req.params;
            const children = await CategoryModel.find(
                { parent },
                { __v: 0, parent: 0 }
            );
            if (!children)
                throw createHttpError.NotFound(
                    "we can not find sub categories"
                );
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    children,
                },
            });
        } catch (err) {
            next(err);
        }
    }

    async checkExistsCategory(id) {
        const category = await CategoryModel.findById(id);
        if (!category)
            throw createHttpError.NotFound("category does not exist");
        return category;
    }
}

module.exports = {
    CategoryController: new CategoryController(),
};
