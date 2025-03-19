const ytdl = require('@distube/ytdl-core')

async function getDownloadLink(videoUrl) {
  try {
    if (!ytdl.validateURL(videoUrl)) {
      console.log('Invalid YouTube URL')
      return
    }

    const info = await ytdl.getInfo(videoUrl)

    // Cherche la qualité 720p
    const format = info.formats.find((f) => f.qualityLabel === '720p' && f.hasAudio)

    if (!format) {
      console.log('720p avec audio non disponible. Téléchargement en qualité inférieure.')
      return
    }

    console.log('Download Link:', format.url)
    return format.url
  } catch (error) {
    console.error('Error fetching video link:', error)
  }
}

// Exemple d'utilisation
const videoUrl = 'https://www.youtube.com/watch?v=2kBhVSCN1k4' // Remplace avec ton URL
getDownloadLink(videoUrl)
