import { useState, useEffect, useRef } from "react";
import "./App.css";
import Call from "./assets/Call";
import Mute from "./assets/Mute";
import Pause from "./assets/Pause";
import HangUp from "./assets/Hangup";

const App = () => {
  const [showCallModal, setCallModal] = useState(false);
  const [muteCall, setMuteCall] = useState(false);
  const [pauseCall, setPauseCall] = useState(false);
  const [callStatus, setCallStatus] = useState("Calling...");
  const [seconds, setSeconds] = useState(0);
  const [animateCallIcon, setAnimateCallIcon] = useState(true);
  const [showConfirmationModal, setConfirmationModal] = useState(false);
  const timerIntervalRef = useRef(null); // Use ref to store the interval ID

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateCallIcon(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleConfModal = () => {
    setConfirmationModal(!showConfirmationModal);
  };

  const handleCallModal = () => {
    if (showCallModal) {
      setSeconds(0);
      setCallStatus("Calling...");
    }
    setCallModal(!showCallModal);
  };

  const handleMuteCall = () => setMuteCall(!muteCall);

  const handlePauseCall = () => setPauseCall(!pauseCall);

  useEffect(() => {
    let timer;
    if (showCallModal) {
      timer = setTimeout(() => setCallStatus("00:00"), 5000);
    }
    return () => clearTimeout(timer);
  }, [showCallModal]);

  useEffect(() => {
    if (callStatus !== "Calling..." && showCallModal) {
      timerIntervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
    return () => clearInterval(timerIntervalRef.current); // Clear interval when call ends
  }, [callStatus, showCallModal]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return hours > 0
      ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(secs).padStart(2, "0")}`
      : `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleEndCall = () => {
    clearInterval(timerIntervalRef.current); // Stop the timer completely
    setCallModal(false);
    setMuteCall(false);
    setPauseCall(false);
    setSeconds(0); // Optionally reset the seconds when call ends
    setCallStatus("Calling..."); // Reset the call status
  };

  return (
    <div className="app">
      <div className="call-icon">
        <div onClick={handleConfModal}>
          {!showCallModal ? (
            <div className={`make-call ${animateCallIcon ? "bounce" : ""}`}>
              <Call width={25} height={25} />
            </div>
          ) : (
            <div onClick={handleEndCall} className="end-call">
              <HangUp width={25} height={25} />
            </div>
          )}
        </div>
        {showConfirmationModal && (
          <div className="conf-modal">
            <p>Are you sure you want to call this contact?</p>
            <div className="btns">
              <button
                className="btn-no"
                onClick={() => setConfirmationModal(false)}
              >
                No
              </button>
              <button className="btn-yes" onClick={handleCallModal}>
                Yes
              </button>
            </div>
          </div>
        )}
        {showCallModal && (
          <div className="call-modal">
            <div className="header">
              <img
                src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=peter`}
                alt=""
                width={50}
                height={50}
              />
              <div className="header-deets">
                <h4>John Doe</h4>
                <p>
                  {callStatus === "Calling..."
                    ? callStatus
                    : `Connected: ${formatTime(seconds)}`}
                </p>
              </div>
            </div>
            <div className="actions">
              <div
                onClick={handleMuteCall}
                className={`action ${muteCall && "muted-call"}`}
              >
                <Mute fill="white" width={25} height={25} className="mute" />
              </div>
              <div
                onClick={handlePauseCall}
                className={`action ${pauseCall && "pause-call"}`}
              >
                <Pause
                  stroke="white"
                  width={25}
                  height={25}
                  className="pause"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
