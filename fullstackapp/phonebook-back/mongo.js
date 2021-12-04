const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://diegoromerodev:${password}@cluster0.uugy9.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then(() => console.log("connected"))
  .catch(() => console.error("connection failed or no password specified"));

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length < 4) {
  Person.find().then((results) => {
    console.log("phonebook:");
    results.forEach(console.log);
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4] || "",
  });
  person.save().then((savedPerson) => {
    console.log(
      "added " +
        savedPerson.name +
        " number " +
        savedPerson.number +
        " to phonebook"
    );
    mongoose.connection.close();
  });
}
