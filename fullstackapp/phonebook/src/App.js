import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import Notification from "./Notification";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personsServices from "./services/persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({});

  useEffect(() => {
    personsServices.getAll().then(setPersons);
  }, []);

  return (
    <div>
      <Notification notification={notification} />
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} setPersons={setPersons} />
    </div>
  );
}

export default App;
