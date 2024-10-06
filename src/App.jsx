import ClickToCallButton from "./components/ClickToCallButton";
import CallInterface from "./components/CallInterface";
import CallHistory from "./components/CallHistory";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1>Click-to-Call Demo</h1>
      <ClickToCallButton phoneNumber="1234567890" />
      <CallInterface />
      <CallHistory />
    </div>
  );
};

export default App;
