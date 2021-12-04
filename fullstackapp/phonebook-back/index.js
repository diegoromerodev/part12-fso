require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Person = require("./models/Person");

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
morgan.token("body", (req) =>
  req.body && Object.keys(req.body).length ? JSON.stringify(req.body) : ""
);
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens["body"](req, res),
    ].join(" ");
  })
);

app.get("/info", (req, res) => {
  Person.find().then((persons) => {
    const numberOfPeople =
      persons.length +
      (persons.length > 1 || !persons.length ? " people" : " person");
    const date = new Date();
    const html = `<p>Phonebook has info for ${numberOfPeople}.</p><p>${date}</p>`;
    res.send(html);
  });
});

app.get("/api/persons", (req, res) => {
  Person.find().then((results) => res.json(results));
});

app.post("/api/persons", (req, res, next) => {
  const { body } = req;

  if (!body.name || !body.number) {
    return next({
      error: "request must contain a name and a number",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((saved) => {
      res.json(saved);
    })
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id).then((person) => {
    return res.json(person);
    if (!person) {
      next();
    }
  });
});

app.put("/api/persons/:id", (req, res, next) => {
  const { body } = req;
  if (!body.name || !body.number) return next({ error: "missing update info" });
  const { name, number } = body;
  const updates = { name, number };
  Person.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  })
    .then((updated) => {
      res.json(updated);
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end();
  });
});

app.use((req, res, next) => {
  return res.status(404).send({ error: "route not found" });
});

app.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("LISTENING ON PORT " + PORT);
});
