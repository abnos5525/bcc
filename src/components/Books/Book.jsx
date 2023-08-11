import { useEffect, useContext, useState } from 'react'
import {Link, useParams} from "react-router-dom"
import {getOneBook} from "../../services/BookServices.js"
import { ContextApp } from '../../context/ContextApp.js'
import  Spinner  from '../Spinner.jsx'

const Book=()=>{

    const param = useParams()
    const {book,setBook,confirmDelete} = useContext(ContextApp)

    const [loading, setLoading] = useState(false)

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


    return( //showing a book details
        <> 
                <div className='container' 
        style={{position:'absolute',left:'320px',top:'180px',width:'350px'}}>
        { loading ? <Spinner /> : book.length !== 0 ?(
            <div className='card p-0' style={{backgroundColor: 'rgb(255, 218, 129)'}}>
                <div className='card-body'>
                    <h3 className='card-title' style={{background:'#f09393'}}>
                        {book.name}
                    </h3>
                    <p className="card-text fw-bold">
                        ID: {book.id}
                        <br/>
                        Date: {book.date}
                        <br/>
                        <span style={{fontSize: '25px'}}>
                        Amount: {book.amount}
                        </span>
                    </p>
                </div>
                <div className='col-1 w-100'>
                    <Link to={`/books/edit/${book.id}`} className='btn btn-info mx-2'>ویرایش</Link>
                    <button onClick={()=> confirmDelete(book.id,book.name)} className='btn btn-info mx-2'>حذف</button>
                </div>
            </div>
            ) : <div className='text-dark' style={{fontSize:'30px'}}>کتابی یافت نشد</div>}
        </div>
             
        </>
    )
}

export default Book