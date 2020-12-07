const genericGetEpisode = require('./util/genericGetEpisode')
const pushToPlaylist = require('./util/pushToPlaylist');

const getEpisodesSummaries = (episodes, spotifyApi, playlistEpisodes) => {
  let requestPromises = []
  console.log("episodes",  episodes)
    for (let i = 0; i < episodes.length; i++) {
      const currentEpisode = episodes[i]
      const request = genericGetEpisode(currentEpisode, spotifyApi)
      .then((episodeSummary) => pushToPlaylist(playlistEpisodes, episodeSummary))
      requestPromises.push(request)
    }
    return requestPromises
}

module.exports = getEpisodesSummaries