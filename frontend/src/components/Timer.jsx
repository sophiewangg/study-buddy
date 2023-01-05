import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { switchMode, getTimerMinutes } from "../features/timer/timerSlice";

function Timer() {
    const dispatch = useDispatch();
    const { sessionSeconds, currentMode } = useSelector((state) => state.timer);

    const [isPaused, setIsPaused] = useState(true);
    const [remainingSeconds, setRemainingSeconds] = useState(sessionSeconds);
    const isPausedRef = useRef(isPaused); //useRef so that no re-render occurs when value is updated
    const remainingSecondsRef = useRef(remainingSeconds);
    
    const tick = () => {
        remainingSecondsRef.current--;
        console.log(remainingSecondsRef);
        setRemainingSeconds(remainingSecondsRef.current);
    }
    
    const togglePaused = () => {
        setIsPaused(!isPausedRef.current);
    }

    useEffect(() => {
        if (!isPausedRef) {
            const intervalId = setInterval(() => {
                tick();
                if (remainingSecondsRef <= 0) {
                    setIsPaused(true);
                    dispatch(switchMode());
                    dispatch(getTimerMinutes());
                    return () => clearInterval(intervalId); // look into cleanup functions
                }
            }, 1000)
        }
    }) //add the settingsInfo in the dependency array? 

    const displayedMinutes = Math.floor(remainingSeconds/60);
    const displayedSeconds = remainingSeconds % 60 < 10 ? `0${remainingSeconds % 60}` : remainingSeconds % 60;
    
    return (
        <div>
            <p> {`${displayedMinutes} : ${displayedSeconds}`}</p>
            <button onClick={togglePaused}> clickme </button>
        </div>
      )
}

export default Timer