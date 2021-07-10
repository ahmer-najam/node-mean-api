const mongoose = require("mongoose");
// const localURI = "mongodb://localhost:27017/my-db";
const localURI =
  "mongodb+srv://ahmer:Yahoo@786@cluster0.2iz16.mongodb.net/my-expense?retryWrites=true&w=majority";

mongoose.connect(
  localURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) console.log("Connected to MongoDb...");
    else console.log("Error: unable to connect MongoDb : " + err.errmsg);
  }
);

module.exports = mongoose;
