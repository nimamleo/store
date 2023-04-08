const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { StatusCodes } = require("http-status-codes");

const {
    CategoryResolver,
    CategoryChildResolver,
} = require("./queries/category.resolver");

const {
    CreateCommentForBlog,
    CreateCommentForProduct,
    CreateCommentForCourse,
} = require("./mutations/comment.resolver");

const {
    LikeProduct,
    LikeBlog,
    LikeCourse,
} = require("./mutations/likes.resolver");

const {
    DislikeProduct,
    DislikeBlog,
    DislikeCourse,
} = require("./mutations/dislikes.resolver");

const {
    bookmarkProduct,
    bookmarkBlog,
    bookmarkCourse,
} = require("./mutations/bookmarks.resolver");

const {
    getUserBookmarkedBlogs,
    getUserBookmarkedProducts,
    getUserBookmarkedCourses,
} = require("./mutations/user-profile.resolver");

const { CourseResolver } = require("./queries/course.resolver");
const { ProductResolver } = require("./queries/product.resolver");

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blogs: BlogResolver,
        products: ProductResolver,
        categories: CategoryResolver,
        childOfCategory: CategoryChildResolver,
        courses: CourseResolver,
        getUserBookmarkedBlogs,
        getUserBookmarkedProducts,
        getUserBookmarkedCourses,
    },
});
// GUD
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        CreateCommentForBlog,
        CreateCommentForProduct,
        CreateCommentForCourse,
        LikeProduct,
        LikeCourse,
        LikeBlog,
        DislikeProduct,
        DislikeBlog,
        DislikeCourse,
        bookmarkProduct,
        bookmarkBlog,
        bookmarkCourse,
    },
});
const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});
module.exports = {
    graphQLSchema,
};
