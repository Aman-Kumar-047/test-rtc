import React, {useState} from 'react';
import './App.css';

import { joinChannel, leaveChannel} from './agoraSdk/AgoraSdk';

function App() {
  // const [isCallStarted, setIsCallStarted] = useState(false);

  return (
    <div className="App">
      {/* <div id="container" className="container">
      {isCallStarted === false ? 
      
      <button className={"joinButton"} onClick={() => {
        setIsCallStarted(true);
        joinChannel()
      }}>Talk to a Doctor 
 </button>
            :
      <button className={"cancelButton"} onClick={() => {
        setIsCallStarted(false);
        leaveChannel();}}>End call</button>

      }
      </div> */}
            <button onClick={() => {
        joinChannel()
      }}>Talk to a Doctor 
 </button>
            
      <button onClick={() => {
        leaveChannel();}}>End call</button>
    </div>
  );
}

export default App;
