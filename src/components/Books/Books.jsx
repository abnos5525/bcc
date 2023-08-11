import { useEffect, useState } from 'react'
import { NavLink,Outlet, useNavigate } from "react-router-dom"
import {deleteBook, getAllBooks} from "../../services/BookServices.js"

import { ContextApp } from '../../context/ContextApp.js'
import Spinner from '../Spinner.jsx'
import { confirmAlert } from 'react-confirm-alert'

import { debounce } from 'lodash'

const Books=()=>{

    // states
//////////////////////////////////////////
    const [books, setBooks] = useState([])
    const [book, setBook] = useState([])
    const [loading, setLoading] = useState(false)
    const [render, setRender] = useState(false)
    const [filteredBooks, setFilteredBooks] = useState([])

    useEffect(()=>{ //getting all books from db.json
        const fetch= async()=>{
            try{
            setLoading(true)
            const {data: bookData} = await getAllBooks()
            if(bookData){
            setBooks(bookData)
            setFilteredBooks(bookData)
            setLoading(false)
            }

            }catch(err){
                console.log(err)
                setLoading(false)
            }
        }
        fetch()
    },[render])


    const navigate = useNavigate()
    const confirmDelete = (bookID, bookName)=>{ //delete alert while deleting a book
        confirmAlert({
          customUI : ({ onClose }) =>{
            return(
              <div style={{backgroundColor:'orange', border:'1px solid purple', 
              borderRadius: '1rem', zIndex:'999'}} className="p-4">
                <h1 >حذف مخاطب</h1>
                <p>مطمعنی میخوایی {bookName} را پاک کنی؟ </p>
    
                <button className="btn mx-2" style={{backgroundColor: 'red'}} onClick={()=>{
                  deleteBookFunc(bookID)
                  onClose()
                  navigate(`/books`)
                }}>حذف</button>
    
                <button className="btn" style={{backgroundColor:'gray'}} onClick={onClose}>انصراف</button>
              </div>
            )
          }
        })
      }

    const deleteBookFunc = async (bookID) =>{ //deleting books function
        const allBooks = [...books]
    try{
      const updatedBooks = books.filter(b=> b.id !== bookID)
      setBooks(updatedBooks)
      setFilteredBooks(updatedBooks)

      const {status} = await deleteBook(bookID)

      if(status !== 200){
        setBooks(allBooks)
        setFilteredBooks(allBooks)
      }
      
    }catch(err){
      console.log(err.message)
      setBooks(allBooks)
      setFilteredBooks(allBooks)
    }
    }

    const bookSearch = debounce((query)=>{ //searching books function

      if(!query) return setFilteredBooks([...books])
          setFilteredBooks(books.filter((book)=>{
          return book.name.includes(query)
        })
        )  

    },1000)

        return(
            <ContextApp.Provider value={{
                loading,
                setLoading,
                book,
                setBook,
                books,
                setBooks,
                render,
                setRender,
                confirmDelete,
                filteredBooks,
                setFilteredBooks
            }}>
            <div className='col-3' style={{position:'absolute',left:'160px',top:'80px',width:'25%'}}>

            <input onChange={(e)=> bookSearch(e.target.value)}
             type='text' placeholder='جستجوی کتاب'/>

                <div className='grid'>
                {
                    loading ? <Spinner/> : (

                    filteredBooks.length > 0 ? filteredBooks.map(b =>( // showing all books
                        <NavLink className='booksLink float-end' 
                        to={`/books/${b.id}`} key={b.id} 
                        style={({isActive})=>{
                            return(
                                isActive ? {color:'red',backgroundColor:'rgb(213, 213, 213)',borderRadius:'10px'} : null
                            )
                        }}>
                            {b.name}
                        </NavLink>
                        
                    )) : <div>کتاب یافت نشد</div>
                    
                    )
                }
                </div>
                
                    <NavLink onClick={()=> setBook({})} className='btn d-block bg-warning' 
                    style={{textDecoration: 'none',color:'black',position: 'absolute',left: '-90px',top: '50px'}} to='/books/add'>
                        اضافه
                    </NavLink>
                <NavLink className='btn d-block bg-danger' to='/' 
                style={{position: 'absolute',left: '-90px',top: '120px'}}>
                        پنهان
                </NavLink>
                <Outlet/>
            </div>
            </ContextApp.Provider>
        )
}

export default Books