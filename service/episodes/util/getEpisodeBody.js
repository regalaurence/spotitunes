const getEpisodeBody = (episode, platform) => {
  switch(platform) {
    case 'spotify':
      return {
        id: episode.body.id,
        title: episode.body.name,
        link: episode.body.external_urls.spotify,
        image: episode.body.images[0].url,
        description: episode.body.description,
        podcast: episode.body.show.name,
        podcastID: episode.body.show.id,
      }
    case 'listennotes':
      return {
        id: episode.body.id,
        title: episode.body.title,
        link: episode.body.link,
        image: episode.body.image,
        description: episode.body.description,
        podcast: episode.body.title,
        podcastID: episode.body.podcast.id,
      }
    default:
      return {}
  }
}

module.exports = getEpisodeBody