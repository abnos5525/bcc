import axios from "axios";

const address = "http://localhost:8000"

export const getAllBooks = ()=>{
    const result = axios.get(`${address}/books`)
    return result
}

export const getOneBook = (id) =>{
    const result = axios.get(`${address}/books/${id}`)
    return result
}

export const editBook = (id,book) =>{
    const result = axios.put(`${address}/books/${id}`,book)
    return result
}

export const addBook = (book)=>{
    const result = axios.post(`${address}/books`,book)
    return result
}

export const deleteBook = (id)=>{
    const result = axios.delete(`${address}/books/${id}`)
    return result
}