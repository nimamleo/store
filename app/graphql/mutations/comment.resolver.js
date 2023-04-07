const { GraphQLString } = require("graphql");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const {
    VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/VerifyAccessToken");
const { BlogModel } = require("../../models/blog.model");
const { ProductModel } = require("../../models/product.model");
const { CourseModel } = require("../../models/course.model");
const { copyObject } = require("../../utils/functions");
const { ResponseType } = require("../typeDefs/public.tpe");

const CreateCommentForBlog = {
    type: ResponseType,
    args: {
        comment: { type: GraphQLString },
        blogId: { type: GraphQLString },
        parent: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { comment, blogId, parent } = args;
        const { req, res } = context;
        const user = await VerifyAccessTokenInGraphQL(req, res);
        if (!mongoose.isValidObjectId(blogId))
            throw createHttpError.BadRequest("invalid Id");
        await checkExistBlog(blogId);
        if (parent && mongoose.isValidObjectId(parent)) {
            const commentDocument = await getComment(BlogModel, parent);
            if (commentDocument && !commentDocument.openToComment)
                throw createHttpError.BadRequest(
                    "register commnet for answers is not possible"
                );
            const createAnswerResult = await BlogModel.updateOne(
                { _id: blogId, "comments._id": parent },
                {
                    $push: {
                        "comments.$.answers": {
                            comment,
                            user: user._id,
                            show: false,
                            openToComment: false,
                        },
                    },
                }
            );
            if (createAnswerResult.modifiedCount == 0)
                throw createHttpError.InternalServerError(
                    "answer not saved please try again"
                );
            return {
                statusCode: StatusCodes.CREATED,
                data: { message: "answer saved" },
            };
        } else {
            await BlogModel.updateOne(
                { _id: blogId },
                {
                    $push: {
                        comments: {
                            comment,
                            user: user._id,
                            show: false,
                            openToComment: true,
                        },
                    },
                }
            );
        }

        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message: "comment saved successfully",
            },
        };
    },
};

const CreateCommentForProduct = {
    type: ResponseType,
    args: {
        comment: { type: GraphQLString },
        productId: { type: GraphQLString },
        parent: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        try {
            
        } catch (err) {
            console.log(err);
        }
        const { req } = context;
        const user = await VerifyAccessTokenInGraphQL(req);
        const { comment, productId, parent } = args;
        if (!mongoose.isValidObjectId(productId))
            throw createHttpError.BadGateway(
                "شناسه محصول ارسال شده صحیح نمیباشد"
            );
        await checkExistProduct(productId);
        if (parent && mongoose.isValidObjectId(parent)) {
            const commentDocument = await getComment(ProductModel, parent);
            if (commentDocument && !commentDocument?.openToComment)
                throw createHttpError.BadRequest("ثبت پاسخ مجاز نیست");
            const createAnswerResult = await ProductModel.updateOne(
                {
                    _id: productId,
                    "comments._id": parent,
                },
                {
                    $push: {
                        "comments.$.answers": {
                            comment,
                            user: user._id,
                            show: false,
                            openToComment: false,
                        },
                    },
                }
            );
            if (!createAnswerResult.modifiedCount) {
                throw createHttpError.InternalServerError("ثبت پاسخ انجام نشد");
            }
            return {
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "پاسخ شما با موفقیت ثبت شد",
                },
            };
        } else {
            await ProductModel.updateOne(
                { _id: productId },
                {
                    $push: {
                        comments: {
                            comment,
                            user: user._id,
                            show: false,
                            openToComment: true,
                        },
                    },
                }
            );
        }
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message:
                    "ثبت نظر با موفقیت انجام شد پس از تایید در وبسایت قرار میگیرد",
            },
        };
    },
};
const CreateCommentForCourse = {
    type: ResponseType,
    args: {
        comment: { type: GraphQLString },
        courseId: { type: GraphQLString },
        parent: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        try {
            const { comment, courseId, parent } = args;
            const { req, res } = context;
            const user = await VerifyAccessTokenInGraphQL(req, res);
            if (!mongoose.isValidObjectId(courseId))
                throw createHttpError.BadRequest("invalid Id");
            await checkExistCourse(courseId);
            if (parent && mongoose.isValidObjectId(parent)) {
                const commentDocument = await getComment(CourseModel, parent);
                if (commentDocument && !commentDocument.openToComment)
                    throw createHttpError.BadRequest(
                        "register commnet for answers is not possible"
                    );
                const createAnswerResult = await CourseModel.updateOne(
                    { _id: courseId, "comments._id": parent },
                    {
                        $push: {
                            "comments.$.answers": {
                                comment,
                                user: user._id,
                                show: false,
                                openToComment: false,
                            },
                        },
                    }
                );
                if (createAnswerResult.modifiedCount == 0)
                    throw createHttpError.InternalServerError(
                        "answer not saved please try again"
                    );
                return {
                    statusCode: StatusCodes.CREATED,
                    data: { message: "answer saved" },
                };
            } else {
                await CourseModel.updateOne(
                    { _id: courseId },
                    {
                        $push: {
                            comments: {
                                comment,
                                user: user._id,
                                show: false,
                                openToComment: true,
                            },
                        },
                    }
                );
            }

            return {
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "comment saved successfully",
                },
            };
        } catch (err) {
            console.log(err);
        }
    },
};
async function checkExistBlog(id) {
    const blog = await BlogModel.findById(id);
    if (!blog) throw createHttpError.NotFound("blog not found");
    return blog;
}
async function checkExistProduct(id) {
    const product = await ProductModel.findById(id);
    if (!product) throw createHttpError.NotFound("product not found");
    return product;
}
async function checkExistCourse(id) {
    const Course = await CourseModel.findById(id);
    if (!Course) throw createHttpError.NotFound("Course not found");
    return Course;
}
async function getComment(model, id) {
    const findedComment = await model.findOne(
        { "comments._id": id },
        { "comments.$": 1 }
    );
    const comment = copyObject(findedComment);
    if (!comment?.comments?.[0])
        throw createHttpError.NotFound("comment not found");
    return comment?.comments?.[0];
}

module.exports = {
    CreateCommentForBlog,
    CreateCommentForCourse,
    CreateCommentForProduct,
};
