//connect to mongodb
const mongoose = require("mongoose");

const dbConnect = async () => {
  await mongoose
    .connect(
      process.env.MONGO_URL,
      {}
    )
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err));
};
module.exports = dbConnect;
