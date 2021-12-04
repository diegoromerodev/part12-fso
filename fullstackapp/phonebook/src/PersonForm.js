import React, { useState } from "react";
import personsServices from "./services/persons";

export default (props) => {
  const { persons, setPersons, setNotification } = props;

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const checkDuplicate = (value) => {
    const tester = new RegExp(value, "i");
    return persons.find((person) => tester.test(person.name));
  };

  const handleError = (err) => {
    setNotification({
      message: err.response.data.error,
      type: "warning",
    });
    setTimeout(() => setNotification({}), 6000);
  };

  const addName = (e) => {
    e.preventDefault();
    if (!newName || !newNumber) return;
    const dupe = checkDuplicate(newName);
    if (dupe) {
      if (
        !confirm(
          `${newName} is already present in the phonebook, do you want to update the number?`
        )
      ) {
        return false;
      }
      dupe.number = newNumber;
      setNewName("");
      setNewNumber("");
      personsServices
        .updateOne(dupe)
        .then(() => {
          setPersons(persons.map((p) => (p.id === dupe.id ? dupe : p)));
          setNotification({
            message: `Successfully updated ${dupe.name}'s number.`,
            type: "success",
          });
          setTimeout(() => setNotification({}), 3000);
        })
        .catch((err) => {
          handleError(err);
        });
      return true;
    }

    const personObj = {
      name: newName,
      number: newNumber,
    };

    personsServices
      .saveOne(personObj)
      .then((personData) => {
        setPersons(persons.concat(personData));
        setNotification({
          message: `Successfully added ${personObj.name}'s number.`,
          type: "success",
        });
        setTimeout(() => setNotification({}), 3000);
      })
      .catch((err) => {
        handleError(err);
      });

    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={addName}>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
