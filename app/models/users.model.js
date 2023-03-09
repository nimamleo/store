const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema(
    {
        first_name: { type: String },
        last_name: { type: String },
        username: { type: String, lowercase: true },
        mobile: { type: String, required: true },
        email: { type: String, lowercase: true },
        password: { type: String },
        otp: {
            type: Object,
            default: {
                code: 0,
                expires: 0,
            },
        },
        bills: { type: [], default: [] },
        discount: { type: Number, default: 0 },
        birthday: { type: String, default: 0 },
        roles: { type: [String], default: ["USER"] },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

module.exports = {
    UserModel: mongoose.model("user", Schema),
};
