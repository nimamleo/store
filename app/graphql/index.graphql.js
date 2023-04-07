const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const {
    CategoryResolver,
    CategoryChildResolver,
} = require("./queries/category.resolver");
const {
    CreateCommentForBlog,
    CreateCommentForProduct,
    CreateCommentForCourse,
} = require("./mutations/comment.resolver");
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
    },
});
// GUD
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        CreateCommentForBlog,
        CreateCommentForProduct,
        CreateCommentForCourse,
    },
});
const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});
module.exports = {
    graphQLSchema,
};
