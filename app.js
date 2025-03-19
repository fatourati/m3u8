const express = require('express');
const ytdl = require('@distube/ytdl-core');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/getDownloadLink', async (req, res) => {
    const videoUrl = req.query.url;

    if (!videoUrl || !ytdl.validateURL(videoUrl)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    try {
        console.log('Fetching video info...');
        const info = await ytdl.getInfo(videoUrl);
        const format = info.formats.find(f => f.qualityLabel === '720p' && f.hasAudio);

        if (!format) {
            return res.status(404).json({ error: '720p format not available' });
        }

        console.log('Download URL:', format.url);
        res.json({ downloadUrl: format.url });
    } catch (error) {
        console.error('Error fetching video info:', error);
        res.status(500).json({ error: 'Error fetching video link' });
    }
});


// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
