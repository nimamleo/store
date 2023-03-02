const { default: mongoose } = require("mongoose");

const Schema = new mongoose({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
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
    roles: { type: [String] , default:["USER"] },
});

module.exports = {
UserModel: mongoose.Model("user", Schema),
};
