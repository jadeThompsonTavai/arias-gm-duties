import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { relative } from 'path';

function App() {

  const [timeLeft, setTimeLeft] = useState(25*60);
  const [isRunning, setIsRunning] = useState(false);

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

  const handleClick = () => {
    if(!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
      setTimeLeft(25*60)
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
        <button className="image-button">Work</button>
        <button className="image-button">Break</button>  
      </div>
    </div>

    <p>You got this!</p>

    <h1 className = "home-timer">{formatTime(timeLeft)}</h1>

    <button className="home-button" onClick={handleClick}>Start</button>

    </div>
 
  );
 
}

export default App;
