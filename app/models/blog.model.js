const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: new Date().getTime() },
    parent: { type: mongoose.Types.ObjectId },
});

const Schema = new mongoose.Schema(
    {
        autor: { type: mongoose.Types.ObjectId, required: true },
        title: { type: String, required: true },
        text: { type: String, required: true },
        short_text: { type: String, required: true },
        image: { type: String, required: true },
        tags: { type: [String], default: [] },
        category: { type: [mongoose.Types.ObjectId], required: true },
        comments: { type: [commentSchema], default: [] },
        like: { type: [mongoose.Types.ObjectId], ref: "users", default: [] },
        disLike: { type: [mongoose.Types.ObjectId], ref: "users", default: [] },
        bookMark: {
            type: [mongoose.Types.ObjectId],
            ref: "users",
            default: [],
        },
    },
    { timestamps: true, versionkey: false }
);

module.exports = {
    BlogModel: mongoose.model("blog", Schema),
};
