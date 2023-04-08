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

const DislikeProduct = {
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
        const updateQuery = disLikedproduct
            ? { $pull: { dislikes: user._id } }
            : { $push: { dislikes: user._id } };
        await ProductModel.updateOne({ _id: productId }, updateQuery);
        let message;
        if (!disLikedproduct) {
            if (likedproduct)
                await ProductModel.updateOne(
                    { _id: productId },
                    { $pull: { likes: user._id } }
                );
            message = "product disliked";
        } else message = "product dislike taken";
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message,
            },
        };
    },
};
const DislikeCourse = {
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
        const updateQuery = disLikedCourse
            ? { $pull: { dislikes: user._id } }
            : { $push: { dislikes: user._id } };
        await CourseModel.updateOne({ _id: courseId }, updateQuery);
        let message;
        if (!disLikedCourse) {
            if (likedcourse)
                await CourseModel.updateOne(
                    { _id: courseId },
                    { $pull: { likes: user._id } }
                );
            message = "course disliked";
        } else message = "course dislike taken";
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message,
            },
        };
    },
};
const DislikeBlog = {
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
        const updateQuery = disLikedBlog
            ? { $pull: { dislikes: user._id } }
            : { $push: { dislikes: user._id } };
        await BlogModel.updateOne({ _id: blogId }, updateQuery);
        let message;
        if (!disLikedBlog) {
            if (likedBlog)
                await BlogModel.updateOne(
                    { _id: blogId },
                    { $pull: { likes: user._id } }
                );
            message = "blog disliked";
        } else message = "blog dislike drppted";
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message,
            },
        };
    },
};

module.exports = {
    DislikeProduct,
    DislikeBlog,
    DislikeCourse,
};
