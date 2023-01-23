const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requred: true,
        unique: true,
    },

    password: {
        type: String,
        requred: true,
    },
});

userSchema.pre("save", function(next) {
    const user = this
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash
        next()
    })
})

module.exports = mongoose.model("User", userSchema);
