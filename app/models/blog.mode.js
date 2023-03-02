const { default: mongoose } = require("mongoose");

const Schema = new mongoose({
    autor: { type: mongoose.Types.ObjectId, required: true },
    title: { type: Stirng, required: true },
    text: { type: Stirng, required: true },
    image: { type: Stirng, required: true },
    tags: { type: [Stirng], default: [] },
    category: { type: mongoose.Types.ObjectId, required: true },
    comments: { type: [], default: [] },
    like: { type: [mongoose.Types.ObjectId] ,default:[] },
    disLike: { type: [mongoose.Types.ObjectId] ,default:[] },
    bookMark: { type: [mongoose.Types.ObjectId] ,default:[] },
});

module.exports = {
    BlogModel: mongoose.Model("blog", Schema),
};
