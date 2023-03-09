const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        parent: {
            type: mongoose.Types.ObjectId,
            ref: "category",
            default: undefined,
        },
    },
    {
        id: false,
        toJSON: {
            virtuals: true,
        },
    }
);

Schema.virtual("children", {
    ref: "category",
    localField: "_id",
    foreignField: "parent",
});

Schema.pre(/^find/, function (next) {
    this.populate([{ path: "children", select: { __v: 0 } }]);
    next();
});

module.exports = {
    CategoryModel: mongoose.model("category", Schema),
};
