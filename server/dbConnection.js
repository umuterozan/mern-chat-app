const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

module.exports = function connectionFactory() {
    mongoose.connect(process.env.MONGODB_URI, () => {
        console.log("MongoDB connected!");
    });
};
