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
const { checkExistProduct, checkExistBlog, checkExistCourse } = require("../utils");

const bookmarkProduct = {
    type: ResponseType,
    args: {
        productId: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        try {
            const { productId } = args;
            const { req } = context;
            const user = await VerifyAccessTokenInGraphQL(req);
            await checkExistProduct(productId);
            const bookmarkedProduct = await ProductModel.findOne({
                _id: productId,
                bookmarks: user._id,
            });
            const updateQuery = bookmarkedProduct
                ? { $pull: { bookmarks: user._id } }
                : { $push: { bookmarks: user._id } };
            await ProductModel.updateOne({ _id: productId }, updateQuery);
            let message = bookmarkedProduct ? "bookmark removed" : "bookmared";
            return {
                statusCode: StatusCodes.CREATED,
                data: {
                    message,
                },
            };
        } catch (err) {
            console.log(err);
        }
    },
};
const bookmarkCourse = {
    type: ResponseType,
    args: {
        courseId: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        try {
            const { courseId } = args;
            const { req } = context;
            const user = await VerifyAccessTokenInGraphQL(req);
            await checkExistCourse(courseId);
            const bookmarkedProduct = await CourseModel.findOne({
                _id: courseId,
                bookmarks: user._id,
            });
            const updateQuery = bookmarkedProduct
                ? { $pull: { bookmarks: user._id } }
                : { $push: { bookmarks: user._id } };
            await CourseModel.updateOne({ _id: courseId }, updateQuery);
            let message = bookmarkedProduct ? "bookmark removed" : "bookmared";
            return {
                statusCode: StatusCodes.CREATED,
                data: {
                    message,
                },
            };
        } catch (err) {
            console.log(err);
        }
    },
};
const bookmarkBlog = {
    type: ResponseType,
    args: {
        blogId: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        try {
            const { blogId } = args;
            const { req } = context;
            const user = await VerifyAccessTokenInGraphQL(req);
            await checkExistBlog(blogId);
            const bookmarkedBlog = await BlogModel.findOne({
                _id: blogId,
                bookMarks: user._id,
            });
            const updateQuery = bookmarkedBlog
                ? { $pull: { bookMarks: user._id } }
                : { $push: { bookMarks: user._id } };
            await BlogModel.updateOne({ _id: blogId }, updateQuery);
            let message = bookmarkedBlog ? "bookmark removed" : "bookmared";
            return {
                statusCode: StatusCodes.CREATED,
                data: {
                    message,
                },
            };
        } catch (err) {
            console.log(err);
        }
    },
};

module.exports = {
    bookmarkProduct,
    bookmarkCourse,
    bookmarkBlog,
};
