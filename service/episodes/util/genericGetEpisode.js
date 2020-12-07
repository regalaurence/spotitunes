const getEpisodeFromListenNotes = require('./listenNotes');
const getEpisodeFromSpotify = require('./spotify');

const genericGetEpisode = (currentEpisode, spotifyApi) => {
  const episodeId = currentEpisode.episodeID
  let request = Promise.resolve();
  if (currentEpisode.source === "listennotes") {
    request = getEpisodeFromListenNotes(episodeId)
  }
  else if (currentEpisode.source === "spotify") {
    request = getEpisodeFromSpotify(spotifyApi, episodeId)
  }
  console.log('currentEpisode.source', currentEpisode.source);
  console.log('currentEpisode', currentEpisode);
  return request;
}

module.exports = genericGetEpisode;