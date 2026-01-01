import { useState } from 'react'

const Filter = ({value, onChange}) => {
  return (
    <form>
        filter shown with <input onChange={onChange}/>
      </form>
  )
}

const PersonForm = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(
    <form onSubmit={addName}>
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

const Person = ({filteredPersons}) => {
  return(
    <div>
        {filteredPersons.map(person => 
          <p key={person.name}>{person.name} {person.number}</p>  
        )}
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    setPersons(persons.concat(nameObject))
    setFilteredPersons(filteredPersons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleFilterChange = (event) => {
    const filter = event.target.value.toLowerCase()
    const filtered = persons.filter(person => 
      person.name.toLowerCase().includes(filter)
    )
    setFilteredPersons(filtered)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filteredPersons} onChange={handleFilterChange}></Filter>
      
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}></PersonForm>
      <h3>Numbers</h3>
      <Person filteredPersons={filteredPersons}></Person>
    
    </div>
  )
}

export default App