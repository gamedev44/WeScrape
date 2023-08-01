import React, { useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import './App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoSourceUrl, setVideoSourceUrl] = useState('');
  const [isPreviewing, setIsPreviewing] = useState(false);

  const handleChange = (event) => {
    setVideoUrl(event.target.value);
    setVideoSourceUrl('');
  };

  const getVideoUrl = async () => {
    try {
      const response = await axios.get('/video-url', {
        params: { url: videoUrl },
      });
      setVideoSourceUrl(response.data.videoSourceUrl);
      setIsPreviewing(true);
    } catch (error) {
      console.error('Error fetching video URL:', error);
      setVideoSourceUrl('');
      setIsPreviewing(false);
    }
  };

  const downloadVideo = () => {
    const link = document.createElement('a');
    link.href = videoSourceUrl;
    link.download = 'video.mp4';
    link.click();
  };

  return (
    <div className="container">
      <h1>Video Scraper</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter URL containing <video></video>"
          value={videoUrl}
          onChange={handleChange}
        />
        <button onClick={getVideoUrl}>Get Video URL</button>
      </div>

      {isPreviewing && (
        <div className="video-preview">
          <ReactPlayer url={videoSourceUrl} controls width="100%" height="auto" />
        </div>
      )}

      {videoSourceUrl && (
        <div>
          <button onClick={downloadVideo}>Download Video</button>
        </div>
      )}
    </div>
  );
}

export default App;
