import { Link, useParams, useNavigate } from "react-router-dom"
import {useContext, useEffect, useState} from 'react'

import {ContextApp} from '../../context/ContextApp.js'
import {getOneBook, editBook} from '../../services/BookServices.js'
import { ErrorMessage, Field, Form, Formik } from "formik"
import { bookSchema } from "../../validations/bookValid.js"

const EditBook = ()=>{

    const param = useParams()
    
    const {setLoading,books,setBooks,render,setRender} = useContext(ContextApp)

    const [book, setBook] = useState({})

    useEffect(()=>{ //getting one book info from id came from url
        const fetch= async()=>{
            try{
            setLoading(true)
            const {data: bookData} = await getOneBook(parseInt(param.id))
            setBook(bookData)
            setLoading(false)
            }catch(err){
                console.log(err)
                setLoading(false)
            }
        }
        fetch()
    },[param.id])

    const navigate = useNavigate()
    const editBookSubmit = async (value)=>{ //editing a book function
        try{
            const {status,data} = await editBook(param.id,value)
            if(status === 200){
                const allbooks = [...books]

                const bookIndex = allbooks.findIndex(b => b.id === parseInt(param.id))

                allbooks[bookIndex] = {...data}

                setBooks(allbooks)
                setRender(!render)
                navigate(`/books/${param.id}`)
                setBook({})
            }
        }catch(err){
            console.log(err)
        }
    }

    return(
        <>
        <Formik initialValues={book}
         validationSchema={bookSchema}
         enableReinitialize={true}
        onSubmit={(values)=>{
            editBookSubmit(values)
        }}>
            <Form className="row g-3 w-100" style={{position: 'absolute', top: '200px',left:'350px'}}>
            <div className="col-md-6">
                <label htmlFor="name" className="form-label">نام</label>
                <Field name='name' type="text" className="form-control" id="name"/>
                <ErrorMessage name="name" render={msg => <div className="text-danger">{msg}</div>}/>
            </div>

            <div className="col-md-6">
                <label htmlFor="date" className="form-label">تاریخ</label>
                <Field name='date' type="date" className="form-control" id="date"/>
                <ErrorMessage name="date" render={msg => <div className="text-danger">{msg}</div>}/>

            </div>

            <div className="col-12">
                <label htmlFor="amount" className="form-label">قیمت</label>
                <Field name='amount' type="text" className="form-control" id="amount"/>
            </div>
            
            <div className="col-12">
                <button type="submit" className="btn btn-primary mx-2">ویرایش</button>
                <Link to={`/books`} className="btn btn-primary">انصراف</Link>
            </div>
            </Form>
        </Formik>
        </>
    )
}

export default EditBook