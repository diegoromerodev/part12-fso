import React from "react";
import PersonItem from "./PersonItem";
import personsServices from "./services/persons";

export default ({ persons, filter, setPersons }) => {
  const handleDelete = ({ id, name }) => {
    if (!window.confirm(`Delete ${name}?`)) {
      return false;
    }
    personsServices.deleteOne(id).then(() => {
      setPersons(persons.filter((p) => p.id !== id));
    });
  };
  return (
    <>
      {persons.reduce((personsResult, person) => {
        if (filter && !person.name.includes(filter)) return personsResult;
        personsResult.push(
          <PersonItem
            key={person.id}
            handleDelete={() => handleDelete(person)}
            person={person}
          />
        );
        return personsResult;
      }, [])}
    </>
  );
};
