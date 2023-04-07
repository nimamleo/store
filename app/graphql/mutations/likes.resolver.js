const { GraphQLString } = require("graphql");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const {
    VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/VerifyAccessToken");
const { ProductModel } = require("../../models/product.model");
const { ResponseType } = require("../typeDefs/public.tpe");

const LikeProduct = {
    type: ResponseType,
    args: { productId: { type: GraphQLString } },
    resolve: async (_, args, context) => {
        try {
            const { productId } = args;
            const { req, res } = context;
            const user = await VerifyAccessTokenInGraphQL(req, res);
            const likedproduct = await ProductModel.findOne({
                _id: productId,
                likes: user._id,
            });
            const dislikedproduct = await ProductModel.findOne({
                _id: productId,
                dislikes: user._id,
            });
            const updateQuery = likedproduct
                ? { $pull: { likes: user._id } }
                : { $push: { likes: user._id } };
            console.log(updateQuery);
            const updateResult = await ProductModel.updateOne(
                { _id: productId },
                updateQuery
            );
            if (updateResult.modifiedCount == 0)
                throw createHttpError.InternalServerError(
                    "product like proccess failed"
                );
            if (dislikedproduct && !likedproduct) {
                await ProductModel.updateOne(
                    { _id: productId },
                    { $pull: { dislikes: user._id } }
                );
            }
            return {
                data: { message: "product liked" },
                statusCode: StatusCodes.CREATED,
            };
        } catch (err) {
            console.log(err);
        }
    },
};
const LikeCourse = {
    type: ResponseType,
    args: { CourseId: { type: GraphQLString } },
    resolve: async (_, args, context) => {
        const { CourseId } = args;
        const { req } = context;
        const user = await VerifyAccessTokenInGraphQL(req, res);
    },
};
const LikeBlog = {
    type: ResponseType,
    args: { blogId: { type: GraphQLString } },
    resolve: async (_, args, context) => {
        const { blogId } = args;
        const { req } = context;
        const user = await VerifyAccessTokenInGraphQL(req, res);
    },
};

module.exports = {
    LikeProduct,
};
