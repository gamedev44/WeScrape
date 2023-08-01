**1. video_scraper_menu.bat:**

```batch
@echo off

rem Call RunFirstInstall.bat
call RunFirstInstall.bat

rem Call RunLocalAppApp.bat
call RunLocalAppApp.bat

rem Optional: Clean up temporary files (if needed)
del /q RunFirstInstall.bat
del /q RunLocalAppApp.bat
```

**2. RunFirstInstall.bat:**

```batch
@echo off

rem Change directory to the React.js project folder
cd /d "C:\path\to\video-scraper-app"   REM Replace this with the actual path to your React.js project folder

rem Install npm packages
npm install

rem Wait for 15 seconds (adjust as needed)
timeout /t 15 /nobreak
```

**3. RunLocalAppApp.bat:**

```batch
@echo off

rem Change directory to the React.js project folder
cd /d "C:\path\to\video-scraper-app"   REM Replace this with the actual path to your React.js project folder

rem Start the React.js app
start npm start

rem Wait for 5 seconds (adjust as needed)
timeout /t 5 /nobreak
pause
```

**4. public/index.html:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Video Scraper</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

**5. src/App.css:**

```css
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.input-group input {
  flex: 1;
  padding: 8px;
}

.input-group button {
  margin-left: 10px;
}

.video-preview {
  margin-bottom: 20px;
}
```

**6. src/App.js:**

```jsx
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
```

**7. server.js:**

```javascript
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 5000;

app.use(express.json());

app.get('/video-url', async (req, res) => {
  try {
    const { url } = req.query;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const videoSourceUrl = $('video').attr('src');

    if (!videoSourceUrl) {
      throw new Error('Video source URL not found.');
    }

    res.json({ videoSourceUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
```

Remember to replace `"C:\path\to\video-scraper-app"` with the actual path to your React.js project folder in `RunFirstInstall.bat` and `RunLocalAppApp.bat`.

With these scripts, you should be able to run the video scraper application using the `video_scraper_menu.bat` batch file, which will handle the installation, starting the React.js app, and running the Node.js server.