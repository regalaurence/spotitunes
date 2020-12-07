const checkPlaylistName = (playlist, playlistId) => {
  const name = playlist.playlistName;
  const normalizedName = name.toLowerCase()
  const normalizedPlaylistId = playlistId.toLowerCase()
  return normalizedName === normalizedPlaylistId;
}

module.exports = checkPlaylistName;