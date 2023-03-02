const { default: mongoose } = require("mongoose");

const Schema = new mongoose({
    title: { type: String },
    text: { type: String },
    image: { type: String, required: true },
    type: { type: String , default:"main" },
});

module.exports = {
    SliderModel: mongoose.Model("slider", Schema),
};
