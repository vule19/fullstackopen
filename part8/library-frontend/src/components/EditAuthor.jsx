import { useState } from "react"
import { useMutation } from '@apollo/client/react'
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, EDIT_AUTHOR } from './queries'

const EditAuthor = (props) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    })

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        editAuthor({ variables: { name, born: parseInt(born) } })

        setName('')
        setBorn('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    name
                    <input
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    ></input>
                </div>
                <div>
                    born
                    <input
                        type="number"
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    ></input>
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default EditAuthor