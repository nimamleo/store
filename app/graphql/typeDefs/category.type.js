const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { AnyType } = require("./public.tpe");

const CategoryType = new GraphQLObjectType({
    name: "CategoryType",
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        children: { type: new GraphQLList(AnyType) },
    },
});

module.exports = {
    CategoryType,
};
