const { default: mongoose } = require("mongoose");
const { commentSchema } = require("./comments.schema");

const Episodes = mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, default: "free" },
    time: { type: String, required: true },
});
const Chapter = mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, default: "" },
    episodes: { type: [Episodes], default: [] },
});

const Schema = new mongoose({
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    totlal_text: { type: String, required: true },
    images: { type: String, required: true },
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
    teacher: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    chapter: { type: [Chapter], default: [] },
    students: { type: [mongoose.Types.ObjectId], default: [], ref: "user" },
});

module.exports = {
    CoursesModel: mongoose.Model("course", Schema),
};
