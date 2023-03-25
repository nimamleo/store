const { default: mongoose } = require("mongoose");
const { commentSchema } = require("../models/comments.model");

const Episodes = mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, default: "lock" },
    time: { type: String, required: true },
});
const Chapter = mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, default: "" },
    episodes: { type: [Episodes], default: [] },
});

const Schema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        short_text: { type: String, required: true },
        text: { type: String, required: true },
        image: { type: String, required: true },
        tags: { type: [String], default: [] },
        category: {
            type: mongoose.Types.ObjectId,
            ref: "category",
            required: true,
        },
        comments: { type: [commentSchema], default: [] },
        likes: { type: [mongoose.Types.ObjectId], default: [] },
        dislikes: { type: [mongoose.Types.ObjectId], default: [] },
        bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
        price: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        count: { type: Number },
        type: { type: String, default: "free", required: true },
        time: { type: String, default: "00:00:00" },
        status: { type: String, default: "coming soon" },
        teacher: { type: mongoose.Types.ObjectId, ref: "user", required: true },
        chapters: { type: [Chapter], default: [] },
        students: { type: [mongoose.Types.ObjectId], default: [], ref: "user" },
    },
    {
        toJSON: { virtuals: true },
    }
);

Schema.index({ title: "text", short_text: "text", text: "text" });

module.exports = {
    CoursesModel: mongoose.model("course", Schema),
};
