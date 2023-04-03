const { default: mongoose } = require("mongoose");
const { commentSchema } = require("../models/comments.model");
const { getTime, getTimeOfCourse } = require("../utils/functions");

const Episodes = mongoose.Schema(
    {
        title: { type: String, required: true },
        text: { type: String, required: true },
        type: { type: String, default: "lock" },
        time: { type: String, required: true },
        videoAddress: { type: String, required: true },
    },
    {
        toJSON: { virtuals: true },
    }
);

Episodes.virtual("videoUrl").get(function () {
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.videoAddress}`;
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

Schema.virtual("imageUrl").get(function () {
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`;
});
Schema.virtual("totalTime").get(function () {
    return getTimeOfCourse(this.chapters)
});

module.exports = {
    CoursesModel: mongoose.model("course", Schema),
};
