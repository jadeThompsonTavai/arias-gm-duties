import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { relative } from 'path';

function App() {

  const [timeLeft, setTimeLeft] = useState(25*60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if(isRunning && timeLeft > 0){
      timer = setInterval(() => {
        setTimeLeft(prev => prev-1);
      }, 1000);
      
    }
    return() => clearInterval(timer);
  }, [isRunning, timeLeft]); 

  const formatTime = (seconds:number): string => {
    const m = Math.floor(seconds/60).toString().padStart(2, '0');
    
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');

    return `${m}:${s}`;

  };

  const switchMode = (breakMode: boolean) =>{
    setIsBreak(breakMode);
    setIsRunning(false);
    setTimeLeft(breakMode ? 5 *60 : 25 * 60);
  }

  const handleClick = () => {
    if(!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
      setTimeLeft(isBreak ? 5*60 : 25*60)
    }
  }

  return (
    <div style={{position: 'relative'}}>
       <div>
      <button className="closeButton">
        Close
      </button>
    </div>

    <div className="home-content">
      <div className = "home-controls">
        <button className="image-button" onClick = {() => switchMode(false)}>Work</button>
        <button className="image-button" onClick={()=> switchMode(true)}>Break</button>  
      </div>
    </div>

    {/* Here will display working animations instead of encouragement --> Can have character dialogue instead */}
    <p>You got this!</p>

    <h1 className = "home-timer">{formatTime(timeLeft)}</h1>

    <button className="home-button" onClick={handleClick}>Start</button>

    </div>
 
  );
 
}

export default App;
