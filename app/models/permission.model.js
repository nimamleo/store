const { default: mongoose } = require("mongoose");
const Schema = new mongoose.Schema(
    {
        name: { type: String },
        description: {
            type: String,
            default: "",
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);
module.exports = {
    PermissionModel: mongoose.model("permission", Schema),
};
