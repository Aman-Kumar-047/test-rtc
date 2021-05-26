import './App.css';

import { joinChannel, leaveChannel} from './agoraSdk/AgoraSdk';

function App() {
  return (
    <div className="App">
      <button onClick={joinChannel}>Join channel</button>
      {/* <button onClick={}>Start call</button> */}
      <button onClick={leaveChannel}>End call</button>
    </div>
  );
}

export default App;
