//connect to mongodb
const mongoose = require("mongoose");

const dbConnect = async () => {
  await mongoose
    .connect(
      "mongodb+srv://nafiurahman:fanta2000@cluster0.mqga2yr.mongodb.net/",
      {}
    )
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err));
};
module.exports = dbConnect;
