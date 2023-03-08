const { CategoryModel } = require("../../../models/categories.model");
const Controller = require("../controller");
const createError = require("http-errors");
const { addCategorySchema } = require("../../validators/admin/category.schema");

class CategoryController extends Controller {
    async addCategory(req, res, next) {
        try {
            await addCategorySchema.validateAsync(req.body);
            const { title, parent } = req.body;
            const category = await CategoryModel.create({ title, parent });
            if (!category)
                throw createError.InternalServerError("internall server error");
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
                throw createError.InternalServerError(
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
    editCategory(req, res, next) {
        try {
        } catch (err) {
            next(err);
        }
    }
    async getAllCategory(req, res, next) {
        try {
            const category = await CategoryModel.aggregate([
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
                {
                    $match: { parent: undefined },
                },
            ]);
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    category,
                },
            });
        } catch (err) {
            next(err);
        }
    }
    getCategoryById(req, res, next) {
        try {
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
            if (!parents) throw createError.NotFound("there is no category");
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
                throw createError.NotFound("we can not find sub categories");
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
        if (!category) throw createError.NotFound("category does not exist");
        return category;
    }
}

module.exports = {
    CategoryController: new CategoryController(),
};
