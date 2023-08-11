import { useContext, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { addBook } from "../../services/BookServices"
import { ContextApp } from "../../context/ContextApp"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { bookSchema } from "../../validations/bookValid"

const AddBook=()=>{

    const {books, setBook,setLoading,setBooks,render,setRender,setFilteredBooks} = useContext(ContextApp)

    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate()
    const addBookSubmit = async (values) =>{ //adding a book function
        if (isSubmitting) return
        try{
            setIsSubmitting(true)
            setLoading(true)
            const {status, data} = await addBook(values)
            if (status === 201){
                const allBooks = [...books, data]
                setBooks(allBooks)
                setFilteredBooks(allBooks)
                setBooks({})
            }
              navigate('/books')
              setRender(!render)
              setBook({})
            setLoading(false)
            
            console.log(1)
        }catch(err){
            console.log(err)
            setLoading(false)
        }finally {
            setIsSubmitting(false);
        }
    }
    
    return(
        <>
        <Formik initialValues={{
            name: "",
            date: "",
            amount: "",
        }} validationSchema={bookSchema}
        onSubmit={(values)=>{
            addBookSubmit(values)
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
                <button type="submit" className="btn btn-primary mx-2">اضافه</button>
                <Link to={`/books`} className="btn btn-primary">انصراف</Link>
            </div>
            </Form>
        </Formik>
        </>
    )
}

export default AddBook