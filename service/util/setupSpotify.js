const SpotifyWebApi = require('spotify-web-api-node');

const setupSpotify = (clientId, clientSecret,) => {
  // setting the spotify-api goes here:
  const spotifyApi = new SpotifyWebApi({
    clientId,
    clientSecret
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error)); 
  return spotifyApi
}

module.exports = setupSpotify;