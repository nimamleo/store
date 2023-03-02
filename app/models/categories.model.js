const { default: mongoose } = require("mongoose");

const Schema = new mongoose({
    title: { type: String, required: true },
});

module.exports = {
    CategoryModel: mongoose.Model("category", Schema),
};
