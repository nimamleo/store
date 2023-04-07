const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
} = require("graphql");
const { CommentType } = require("./comment.type");
const { UserType, PublicCategoryType } = require("./public.tpe");

const EpisodeType = new GraphQLObjectType({
    name: "EpisodeType",
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        type: { type: GraphQLString },
        time: { type: GraphQLString },
        videoAddress: { type: GraphQLString },
        videoUrl: { type: GraphQLString },
    },
});

const ChaptersType = new GraphQLObjectType({
    name: "ChaptersType",
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        episodes: { type: new GraphQLList(EpisodeType) },
    },
});

const CourseType = new GraphQLObjectType({
    name: "CourseType",
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        short_text: { type: GraphQLString },
        image: { type: new GraphQLList(GraphQLString) },
        imageUrl: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        category: { type: PublicCategoryType },
        price: { type: GraphQLInt },
        discount: { type: GraphQLInt },
        count: { type: GraphQLInt },
        type: { type: GraphQLString },
        status: { type: GraphQLString },
        teacher: { type: UserType },
        chapters: { type: new GraphQLList(ChaptersType) },
        comments: { type: new GraphQLList(CommentType) },
    },
});

module.exports = {
    CourseType,
};
