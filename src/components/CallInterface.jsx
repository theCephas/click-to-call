import { useState, useEffect, useRef } from "react";

const CallInterface = () => {
  const [callStatus, setCallStatus] = useState("idle");
  const [callDuration, setCallDuration] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startCall = () => {
    setCallStatus("active");
    setIsCallActive(true);
    setCallDuration(0);
    timerRef.current = setInterval(() => {
      setCallDuration((prevDuration) => prevDuration + 1);
    }, 1000);
  };

  const handleEndCall = () => {
    setCallStatus("ended");
    setIsCallActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="call-interface">
      <div className="call-status">Status: {callStatus}</div>
      <div className="call-duration">
        Duration: {formatDuration(callDuration)}
      </div>
      {callStatus === "idle" && (
        <button className="start-call-button" onClick={startCall}>
          Start Call
        </button>
      )}
      {isCallActive && (
        <button className="end-call-button" onClick={handleEndCall}>
          End Call
        </button>
      )}
      {callStatus === "ended" && (
        <button className="call-ended-button">Call Ended</button>
      )}
    </div>
  );
};

export default CallInterface;
