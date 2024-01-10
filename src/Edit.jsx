import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { func } from 'prop-types'


const BASE_URL = 'https://659eb9b047ae28b0bd3690ba.mockapi.io'

function Edit(){
    const { id } = useParams()
    const [todo, setTodo] = useState({name: ''})
    
    async function fetchTodo(todoId) {
        try {
        const response = await axios.get(`${BASE_URL}/todos/${todoId}`);
        console.log(response.data)
        setTodo(response.data)
        } catch (error) {
        console.log('error', error);
        }
    }

    useEffect(() => {
        fetchTodo(id)
    }, [id])

    function handleNameChange(event){
        setTodo((previousState) => ({
            ...previousState,
            name: event.target.value
        }))
    }
    async function updateName(){
        try {
            const response = await axios.put(`${BASE_URL}/todos/${id}`,{
                name: todo.name
            });
            alert('Update successfull')
            } catch (error) {
            console.log('error', error);
            }
    }

    return(
        <>
            <div>Hello edit page {id} </div>
            <div>{todo.name}</div>
            <div>
               <input 
               type='text' 
               onChange={handleNameChange}
               value={todo.name}
               ></input>
                {todo.status}
            </div>
            <button onClick={updateName}>Edit</button>
        </>
    )
}
export default Edit