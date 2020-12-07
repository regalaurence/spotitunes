const unirest = require('unirest');
const getEpisodeBody = require('./getEpisodeBody')

const getEpisodeFromListenNotes = (episodeId) => {
  const url = `https://listen-api.listennotes.com/api/v2/episodes/${episodeId}`
  return unirest.get(url)
  .header('X-ListenAPI-Key', 'eca50a3f8a6b4c6e96b837681be6bd3f')
  .then((episode) => {
    return getEpisodeBody(episode, 'listennotes')
  })
}

module.exports = getEpisodeFromListenNotes
