const { GraphQLList, GraphQLString } = require("graphql");
const { CourseModel } = require("../../models/course.model");
const { CourseType } = require("../typeDefs/course.type");

const CourseResolver = {
    type: new GraphQLList(CourseType),
    args: {
        category: { type: GraphQLString },
    },
    resolve: async (_, args) => {
        const { category } = args;
        const finQuery = category ? { category } : {};
        return await CourseModel.find(finQuery).populate([
            "teacher",
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
    CourseResolver,
};
