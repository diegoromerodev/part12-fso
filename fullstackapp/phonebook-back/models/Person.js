const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => console.log("connected"))
  .catch(() => console.error("connection failed or no password specified"));

const personSchema = new mongoose.Schema({
  name: { type: String, unique: true, minlength: 3 },
  number: { type: String, minlength: 8 },
});

personSchema.set("toJSON", {
  transform(doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

personSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Person", personSchema);
