import { Outlet } from "react-router-dom"

import { useContext } from "react"
import { ContextApp } from "../context/ContextApp"
import { useReducer } from "react"

const COUNTERTYPE ={
    inc : 'increment',
    dec : 'decrement',
    res : 'reset'
}

const reducer = (state, action)=>{
    switch(action.type){
        case COUNTERTYPE.inc:
            return {num: state.num + 1}
        case COUNTERTYPE.dec:
            return {num: state.num - 1}
        case COUNTERTYPE.res:
            return {num: 0}
        default:
            return state
    }
}

const Clock =()=>{
    
        const {counterT} = useContext(ContextApp)
        const [state, dispatch] = useReducer(reducer, {num: 0})


    const increase = ()=>{ //increasing number function
        dispatch({type: COUNTERTYPE.inc})
        console.log('increased')
    }

    const decrease = ()=>{ //decreasing number function
        if(state.num > 0){
        dispatch({type: COUNTERTYPE.dec})
        console.log('decreased')
        }
    }

    const reset = ()=>{ //resetting number function
        if(state.num !==0){
        dispatch({type: COUNTERTYPE.res})
        console.log('reset')
        }
    }
 
        return(
            <>
            {
                counterT ?
                <div>
                    <button className="rounded mx-4" style={{width:'20%',height:'60px',fontWeight:'bold',fontSize:'20px'}}
                onClick={()=>increase()}>
                    +
                </button>
                <span style={{fontWeight:'bold'}}>
                    {state.num}
                </span>
                <button className="rounded mx-4" style={{width:'20%',height:'60px',fontWeight:'bold',fontSize:'20px'}}
                onClick={()=>decrease()}>
                    -
                </button>

                <button className="rounded mx-4" style={{width:'20%',height:'60px',fontWeight:'bold',fontSize:'80%'}}
                onClick={()=>reset()}>
                    reset
                </button>
            </div>

                
                 : null
            }
            <Outlet/>
            </>
        )
    }

export default Clock