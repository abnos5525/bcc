import React, { useState, useEffect } from 'react';

// generating a random color in hexadecimal format
  const getRandomColor = () =>{
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    
    // #4a5f91 is color of app background
    if (color !== '#4a5f91')
        return color;
  }

const ColorFull=()=> {

  const [backgroundColor, setBackgroundColor] = useState(getRandomColor);

  useEffect(() => { //changing color every second
    const intervalId = setInterval(() => {
      setBackgroundColor(getRandomColor());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      style={{
        width: '200px',
        height: '200px',
        backgroundColor: backgroundColor,
        position: 'absolute',
        top: '250px',
        right: '215px',
        border: 'solid 1px'
      }}
    ></div>
  );
}

export default ColorFull;
