const { GraphQLString } = require("graphql");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const {
    VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/VerifyAccessToken");
const { BlogModel } = require("../../models/blog.model");
const { CourseModel } = require("../../models/course.model");
const { ProductModel } = require("../../models/product.model");
const { ResponseType } = require("../typeDefs/public.tpe");
const {
    checkExistProduct,
    checkExistCourse,
    checkExistBlog,
} = require("../utils");

const LikeProduct = {
    type: ResponseType,
    args: {
        productId: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await VerifyAccessTokenInGraphQL(req);
        const { productId } = args;
        await checkExistProduct(productId);
        let likedproduct = await ProductModel.findOne({
            _id: productId,
            likes: user._id,
        });
        let disLikedproduct = await ProductModel.findOne({
            _id: productId,
            dislikes: user._id,
        });
        const updateQuery = likedproduct
            ? { $pull: { likes: user._id } }
            : { $push: { likes: user._id } };
        await ProductModel.updateOne({ _id: productId }, updateQuery);
        let message;
        if (!likedproduct) {
            if (disLikedproduct)
                await ProductModel.updateOne(
                    { _id: productId },
                    { $pull: { dislikes: user._id } }
                );
            message = "product liked";
        } else message = "product like taken";
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message,
            },
        };
    },
};
const LikeCourse = {
    type: ResponseType,
    args: {
        courseId: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await VerifyAccessTokenInGraphQL(req);
        const { courseId } = args;
        await checkExistCourse(courseId);
        let likedcourse = await CourseModel.findOne({
            _id: courseId,
            likes: user._id,
        });
        let disLikedCourse = await CourseModel.findOne({
            _id: courseId,
            dislikes: user._id,
        });
        const updateQuery = likedcourse
            ? { $pull: { likes: user._id } }
            : { $push: { likes: user._id } };
        await CourseModel.updateOne({ _id: courseId }, updateQuery);
        let message;
        if (!likedcourse) {
            if (disLikedCourse)
                await CourseModel.updateOne(
                    { _id: courseId },
                    { $pull: { dislikes: user._id } }
                );
            message = "course liked";
        } else message = "course like taken";
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message,
            },
        };
    },
};
const LikeBlog = {
    type: ResponseType,
    args: {
        blogId: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await VerifyAccessTokenInGraphQL(req);
        const { blogId } = args;
        await checkExistBlog(blogId);
        let likedBlog = await BlogModel.findOne({
            _id: blogId,
            likes: user._id,
        });
        let disLikedBlog = await BlogModel.findOne({
            _id: blogId,
            dislikes: user._id,
        });
        const updateQuery = likedBlog
            ? { $pull: { likes: user._id } }
            : { $push: { likes: user._id } };
        await BlogModel.updateOne({ _id: blogId }, updateQuery);
        let message;
        if (!likedBlog) {
            if (disLikedBlog)
                await BlogModel.updateOne(
                    { _id: blogId },
                    { $pull: { dislikes: user._id } }
                );
            message = "blog liked";
        } else message = "blog like drppted";
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message,
            },
        };
    },
};

module.exports = {
    LikeProduct,
    LikeBlog,
    LikeCourse,
};
