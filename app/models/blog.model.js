const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");

const Schema = new mongoose.Schema(
    {
        author: { type: mongoose.Types.ObjectId, ref: "user", required: true },
        title: { type: String, required: true },
        text: { type: String, required: true },
        short_text: { type: String, required: true },
        image: { type: String, required: true },
        tags: { type: [String], default: [] },
        category: {
            type: mongoose.Types.ObjectId,
            ref: "category",
            required: true,
        },
        likes: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
        dislikes: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
        bookMarks: {
            type: [mongoose.Types.ObjectId],
            ref: "user",
            default: [],
        },
        comments: { type: [CommentSchema], default: [] },
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true,
        versionkey: false,
    }
);

Schema.virtual("user", {
    ref: "user",
    localField: "_id",
    foreignField: "author",
});

Schema.virtual("category_detail", {
    ref: "category",
    localField: "_id",
    foreignField: "category",
});

Schema.virtual("imageURL").get(function () {
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`;
});

module.exports = {
    BlogModel: mongoose.model("blog", Schema),
};
