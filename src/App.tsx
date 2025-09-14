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


function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [encouragement, setEncouragement] = useState("");
  const [workButtonImage, setWorkButtonImage] = useState(workBtn);
  const [breakButtonImage, setBreakButtonImage] = useState(breakBtn);
  const [image, setImage] = useState(playImg);

  const workMessages = [
    "Is this all you got?",
    "This is not time for our GM to be slacking.",
    "Stay Focused!",
    "These papers, won't sign themselves.",
  ];

  const breakMessages = [
    "There's more where that came from.",
    "Rest up.",
    "A well-deserved break.",
    "See, it's not so bad",
  ];

  useEffect(() => {
    let messageInterval: NodeJS.Timeout;

    if(isRunning){
      const messages = isBreak ? breakMessages : workMessages;
      setEncouragement(messages[0]); //set first message

      let index = 1;

      messageInterval = setInterval(() => {
        setEncouragement(messages[index]);
        index = (index + 1) % messages.length;
      }, 4000); //4 sec interval
    } else {
      setEncouragement("");
    }

    return () => clearInterval(messageInterval);
  }, [isRunning, isBreak]);

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
    if(!breakMode){
      setWorkButtonImage(workBtnClicked);
      setBreakButtonImage(breakBtn);
    } else {
      setWorkButtonImage(workBtn);
      setBreakButtonImage(breakBtnClicked);
    }
    setIsRunning(false);
    setTimeLeft(breakMode ? 5 * 60 : 25 * 60);
  };

  const handleClick = () => {
    if (!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
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

          {/* Here will display working animations instead of encouragement --> Can have character dialogue instead */}
      <p className={`encouragement-text ${isRunning ? "hidden" : ""} ${isBreak ? "break-text" : ""}`}>
        {encouragement}
      </p>

      
      <h1 className={timerClass}>{formatTime(timeLeft)}</h1>
      <img src={closeBtn} alt="Timer Status" className="gif-image"/><p>Will be replaced with gifs</p>

      <button className="home-button" onClick={handleClick}>
        <img src={playImg} />
      </button>
      </div>

    

    </div>
  );
}

export default App;
