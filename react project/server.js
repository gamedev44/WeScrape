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
