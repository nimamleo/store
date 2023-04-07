const { default: mongoose } = require("mongoose");
const Schema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        permissions: {
            type: [mongoose.Types.ObjectId],
            ref: "permission",
            default: [],
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);
module.exports = {
    RoleModel: mongoose.model("role", Schema),
};
