import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { ContextApp } from "../context/ContextApp"

const Clock=()=>{

      // states
//////////////////////////////////////////
    const {clockT} = useContext(ContextApp)
    const [date, setDate] = useState(new Date())

    useEffect(()=>{ //updating date every second
        setInterval(()=> tick(),1000)
    },[])


    const tick = ()=>{ //setting new date function
        setDate(new Date())
    }

        return(
            <>
            {
                clockT ? 
                <div className="bg-dark p-5 position-relative rounded-2" style={{width:'180px',
            right:'50px'}}>
                <p className="float-end my-5 bg-secondary-subtle rounded p-3 position-absolute" style={{top:'-30px',
                right:'28px'}}>
                {date.toLocaleTimeString()}
                </p>
            </div> 

            : null
            }
            

            </>
        )
    }

export default Clock