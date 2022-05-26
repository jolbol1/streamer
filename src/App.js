import './App.css';
import ReactPlayer from 'react-player/file'
import { useEffect, useState } from 'react';


function App() {

  const [date, setDate] = useState(new Date());
  const [stream, setStream] = useState("webcam");
  const [url, setUrl] = useState("http://localhost:5080/LiveApp/streams/webcam.m3u8");

  useEffect(() => {
    setUrl(`http://localhost:5080/LiveApp/streams/${stream}.m3u8`)
  }, [stream])

  function refreshClock() {
    setDate(new Date())
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return () => {
      clearInterval(timerId)
    }
  }, [])

  return (
    <div className="App">
      <h2>{date.toLocaleTimeString()}</h2>
      <ReactPlayer
        url={url}
        width='640px'
        height='480px'
        volume={0}
        muted={true}
        playing={true}
        config={{
          file: {
            hlsOptions: {
              enableWorker: true,
              maxBufferLength: 1,
              liveBackBufferLength: 0,
              liveSyncDuration: 0,
              liveMaxLatencyDuration: 5,
              liveDurationInfinity: true,
              highBufferWatchdogPeriod: 1
            },
            forceHLS: true
          }
        }}
        style={{margin: '0 auto'}}
      />
      <select name="streams" id="stream-select" onChange={(e) => setStream(e.target.value)} defaultValue="webcam">
        <option value="webcam">Webcam</option>
        <option value="screen">Webcam 2</option>
      </select>
    </div>
  );
}

export default App;
