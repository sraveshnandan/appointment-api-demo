const mongoose = require("mongoose");

const conParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connectToDb = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, conParams).then((con) => {
      console.log(
        ` 👍 Successfully connected to the database: ${con.connection.host}`
      );
    });
  } catch (error) {
    console.log(`Unable to connect to the database , due to ${error}`);
  }
};
module.exports = connectToDb;
