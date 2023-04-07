const { GraphQLList, GraphQLString } = require("graphql");
const { ProductModel } = require("../../models/product.model");
const { ProductType } = require("../typeDefs/product.type ");

const ProductResolver = {
    type: new GraphQLList(ProductType),
    args: {
        category: { type: GraphQLString },
    },
    resolve: async (_, args) => {
        const { category } = args;
        const finQuery = category ? { category } : {};
        return await ProductModel.find(finQuery).populate([
            "supplier",
            "category",
            "comments.user",
            "comments.answers.user",
        ]);
    },
};

module.exports = {
    ProductResolver,
};
