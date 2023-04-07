const { GraphQLList, GraphQLString } = require("graphql");
const { CategoryModel } = require("../../models/categories.model");
const { CategoryType } = require("../typeDefs/category.type");

const CategoryResolver = {
    type: new GraphQLList(CategoryType),
    resolve: async () => {
        return await CategoryModel.find({ parent: undefined });
    },
};
const CategoryChildResolver = {
    type: new GraphQLList(CategoryType),
    args: {
        parent: { type: GraphQLString },
    },
    resolve: async (_, args) => {
        const { parent } = args;
        if (!parent) return {};
        return await CategoryModel.find({ parent });
    },
};

module.exports = {
    CategoryResolver,
    CategoryChildResolver,
};
