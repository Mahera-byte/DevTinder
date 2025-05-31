const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Mahera_user:Mahera%40123@namastenode.nwfcjlu.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
