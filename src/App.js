import {useState } from 'react';
import Clock from './components/Clock';
import Counter from './components/Counter'
import { NavLink} from 'react-router-dom';
import ColorFull from './components/ColorFull';
import './style.css'

import { ContextApp } from './context/ContextApp';
const App=()=>{

  // states
//////////////////////////////////////////
  const [clockT, setClockT] = useState(1) //clock toggle
  const [counterT, setCounterT] = useState(1) //counter toggle

  // functions
//////////////////////////////////////////
  const clockToggle=()=>{ 
        setClockT(!clockT)
  }

  const counterToggle=()=>{
    setCounterT(!counterT)
  }

    return (
      <ContextApp.Provider value={{
        clockT,
        counterT,
      }}>
      <div className='container w-75 my-2 bg-secondary text-center rounded' style={{height:'50px'}}>
        <div className='row h-100' style={{lineHeight: '45px'}}>

          <div className='col-4 p-0'>
          <button onClick={()=> clockToggle()} className='d-block w-100 h-100 text-decoration-none text-black'>
            ساعت 
            </button>
          </div>

          <div className='col-4 p-0'>
          <button onClick={()=> counterToggle()} className='d-block w-100 h-100 text-decoration-none text-black'>شمارنده </button>
          </div>

          <div className='col-4 p-0'>
          
            <NavLink className='text-decoration-none text-black'  
            to='/books'>
            <button className='d-block w-100 h-100'> 
              کتاب ها
            </button>
            </NavLink>
          </div>

        </div>
        <div className='row py-5'>
          <div className='col-4'>
          <Clock />
          </div>
          <div className='col-4'>
          <Counter />
          </div>
        </div>
        <ColorFull/>
      </div>
      
      </ContextApp.Provider>
    ) 
}

export default App;
