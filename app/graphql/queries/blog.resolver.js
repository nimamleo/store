const { GraphQLList, GraphQLString } = require("graphql");
const { BlogModel } = require("../../models/blog.model");
const { BlogType } = require("../typeDefs/blog.type");

const BlogResolver = {
    type: new GraphQLList(BlogType),
    args: {
        category: { type: GraphQLString },
    },
    resolve: async (_, args, contex) => {
        const { category } = args;
        const finQuery = category ? { category } : {};

        return await BlogModel.find(finQuery).populate([
            "author",
            "category",
            "comments.user",
            "comments.answers.user",
            "likes",
            "dislikes",
            "bookmarks",
        ]);
    },
};

module.exports = {
    BlogResolver,
};
