const getEpisodeBody = require('./getEpisodeBody');

const getEpisodeFromSpotify = (spotifyApi, episodeId) => {
  return spotifyApi
  .getEpisode(episodeId, { market: "DE" })
  .then((episode) => {
    return getEpisodeBody(episode, 'spotify')
  })
}

module.exports = getEpisodeFromSpotify

