import { useState, useEffect } from 'react'
import personsService from '/components/services.js'
import Notification from '../components/Notification'

const Filter = ({value, onChange}) => {
  return (
    <form>
        filter shown with <input onChange={onChange}/>
      </form>
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}


const Person = ({filteredPersons, handleDelete}) => {
  return(
    <div>
        {filteredPersons.map(person => 
          <div key={person.id} style={{display: 'flex', gap:'10px'}}>
            <span>{person.name} {person.number}</span>
            <button onClick={() => handleDelete(person)}>delete</button>
          </div>
        )}
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personsService.update(existingPerson.id, updatedPerson).then(returnedPerson => {
          const updatedPersons = persons.map(p => p.id === existingPerson.id ? returnedPerson : p);
          setPersons(updatedPersons);
          setFilteredPersons(updatedPersons);
        }).catch(error => {
          console.error(`Error updating ${existingPerson.name}:`, error);
        });
        setNewName('')
        setNewNumber('')
        setErrorMessage({message: `Updated ${newName}`, type: 'success'});
        setTimeout(() => {
          setErrorMessage(null);
        }, 1000);
      }
    }
    else {
      personsService.create(newPerson).then(returnedPerson => {
        const updatedPersons = persons.concat(returnedPerson)
        setPersons(updatedPersons)
        setFilteredPersons(updatedPersons)
      })
      setNewName('')
      setNewNumber('')
      setErrorMessage({message: `Added ${newName}`, type: 'success'});
      setTimeout(() => {
        setErrorMessage(null);
      }, 1000);
    }
  }

  const handleFilterChange = (event) => {
    const filter = event.target.value.toLowerCase()
    const filtered = persons.filter(person => 
      person.name.toLowerCase().includes(filter)
    )
    setFilteredPersons(filtered)
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.remove(person.id).then(() => {
        console.log(`Deleted ${person.name}`);
        const updatedPersons = persons.filter(p => p.id !== person.id);
        setPersons(updatedPersons);
        setFilteredPersons(updatedPersons);
      }).catch(error => {
        setErrorMessage({message: `Information of ${person.name} has already been removed from server`, type: 'error'});
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      });

    }
    else {
      console.log('Deletion cancelled');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter value={filteredPersons} onChange={handleFilterChange}></Filter>
      
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}></PersonForm>
      <h3>Numbers</h3>
      <Person filteredPersons={filteredPersons} handleDelete={handleDelete}></Person>
    
    </div>
  )
}

export default App