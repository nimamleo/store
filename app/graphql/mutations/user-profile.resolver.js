const { GraphQLList, GraphQLString } = require("graphql");
const {
    VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/VerifyAccessToken");
const { BlogModel } = require("../../models/blog.model");
const { CourseModel } = require("../../models/course.model");
const { ProductModel } = require("../../models/product.model");
const { BlogType } = require("../typeDefs/blog.type");
const { CourseType } = require("../typeDefs/course.type");
const { ProductType } = require("../typeDefs/product.type ");

const getUserBookmarkedBlogs = {
    type: new GraphQLList(BlogType),
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await VerifyAccessTokenInGraphQL(req);
        const blogs = await BlogModel.find({ bookMarks: user._id }).populate([
            "author",
            "category",
            "comments.user",
            "comments.answers.user",
            "likes",
            "dislikes",
            "bookMarks",
        ]);
        return blogs;
    },
};
const getUserBookmarkedProducts = {
    type: new GraphQLList(ProductType),
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await VerifyAccessTokenInGraphQL(req);
        const products = await ProductModel.find({
            bookmarks: user._id,
        }).populate([
            "supplier",
            "category",
            "comments.user",
            "comments.answers.user",
            "likes",
            "dislikes",
            "bookmarks",
        ]);
        return products;
    },
};
const getUserBookmarkedCourses = {
    type: new GraphQLList(CourseType),
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await VerifyAccessTokenInGraphQL(req);
        const courses = await CourseModel.find({
            bookmarks: user._id,
        }).populate([
            "teacher",
            "category",
            "comments.user",
            "comments.answers.user",
            "likes",
            "dislikes",
            "bookmarks",
        ]);
        return courses;
    },
};

module.exports = {
    getUserBookmarkedBlogs,
    getUserBookmarkedProducts,
    getUserBookmarkedCourses,
};
