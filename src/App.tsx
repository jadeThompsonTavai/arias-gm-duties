import React, { useState, useEffect } from "react";
import "./App.css";
import { relative } from "path";

import workBtn from "./assets/work-blue.png";
import workBtnClicked from "./assets/work-blue-clicked.png";
import breakBtn from "./assets/break-blue.png";
import breakBtnClicked from "./assets/break-blue-clicked.png";
import closeBtn from "./assets/close.png";
import playImg from "./assets/play.png";
import resetImg from "./assets/reset.png";
import workGif from "./assets/work.gif";
import bellSound from "./assets/bell.mp3";


function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [workButtonImage, setWorkButtonImage] = useState(workBtn);
  const [breakButtonImage, setBreakButtonImage] = useState(breakBtn);
  const [image, setImage] = useState(playImg);
  const [gifImage, setGifImage] = useState(workGif);
  const bellAudio = new Audio(bellSound);


  //Countdown Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if(timeLeft === 0 && isRunning){
      bellAudio.play().catch(err => {
        console.log("Audio failed to play:", err);
      })
      setIsRunning(false);
      switchMode(isBreak ? false : true);

    }
  });

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");

    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");

    return `${m}:${s}`;
  };

  const switchMode = (breakMode: boolean) => {
    setIsBreak(breakMode);
    setBreakButtonImage(breakMode ? breakBtnClicked : breakBtn);
    setWorkButtonImage(breakMode ? workBtn : workBtnClicked);
    setIsRunning(false);
    setTimeLeft(breakMode ? 5 * 60 : 25 * 60);
  };

  const handleClick = () => {
    if (!isRunning) {
      setIsRunning(true);
      setImage(resetImg);
    } else {
      setIsRunning(false);
      setImage(playImg);
      setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
    }
  };

 
  const containerClass = `home-container ${isBreak ? "bg-blue" : ""}`;
  const timerClass = `home-timer ${isBreak ? "timer-blue": ""}`;


  return (
    <div className={containerClass} style={{ position: "relative" }}>
      <div>
        <button className="closeButton">
          <img src={closeBtn} alt="close"/>
        </button>
      </div>

      <div className="home-content">
        <div className="home-controls">
          <button className="image-button" id="work-button" onClick={() => switchMode(false)}>
            <img src={workButtonImage} alt="work" />
          </button>
          <button className="image-button" id="break-button" onClick={() => switchMode(true)}>
            <img src={breakButtonImage} alt="break" />
          </button>
        </div>

      <h1 className={timerClass}>{formatTime(timeLeft)}</h1>
      
      <div className = "container-to-be-behind">
        <img src={gifImage} alt="Timer Status" className="gif-image"/>
      </div>
      
      <button className="home-button" onClick={handleClick}>
        <img src={image} />
      </button>
      </div>

    

    </div>
  );
}

export default App;
