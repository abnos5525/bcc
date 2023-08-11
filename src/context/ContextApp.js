import { createContext } from "react";

export const ContextApp = createContext({
    clockT : [],
    counterT: [],
    number: 0,
    color: 'red',
    setColor: () =>{},
    book: [],
    setBook: ()=>{},
    books: [],
    setBooks: ()=>{},
    render: false,
    setRender: ()=>{},
    confirmDelete: () =>{},
    filteredBooks: [],
    setFilteredBooks: () => {}
})