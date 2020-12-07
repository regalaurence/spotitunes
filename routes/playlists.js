
// const { Router } = require('express');
const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Playlist = require('../models/Playlist')
const saltRounds = 10;
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const Podcast = require('../models/Podcast');
const unirest = require('unirest');
const setupSpotify = require('../service/util/setupSpotify')
const getEpisodesSummaries = require('../service/episodes/getEpisodesSummaries');
const checkPlaylistName = require('../service/util/checkPlaylistName');

//require spotify Web api
const { findById } = require('../models/Podcast');


const spotifyApi = setupSpotify(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

// display the signup form to users

router.get('/signup', (req, res) => {
  res.render('auth/signup')
});


// display playlist

router.get('/playlists/:playlistId', (req, res) => {
  const playlistId = req.params.playlistId;
  Playlist.find({ ownerID: req.session.currentUser._id })
    .then((playlists) => {
      const playlist = playlists
        .find(
          playlist => 
            (playlist._id === playlistId) || checkPlaylistName(playlist, playlistId)
        );
        if (playlist) {
          const currentEpisodes = playlist.episodes
          let playlistEpisodes = []
          let playlistObject = {
            name: playlist.playlistName,
            content: playlistEpisodes
          }
          const requestPromises = getEpisodesSummaries(currentEpisodes, spotifyApi, playlistEpisodes)
    
          Promise.all(requestPromises).then(() => {
            res.render('users/playlists', { playlistObject: playlistObject, playlistsAll: playlists })
          })
        } else {
          // return
          res.status(404);
        }
      
    })
})

router.post('/bookmarks/:name/:id/delete', (req, res) => {
  console.log("THIS IS THE PARAMS : " + req.params.id)

  Playlist.findOneAndUpdate(
    { $and: [{ ownerID: req.session.currentUser._id }, { playlistName: req.params.name }] },
    { $pull: { episodes: { episodeID: req.params.id } } })
    .then((playlist) => {
      console.log(playlist)
      res.redirect('/playlists/bookmarked')
    })
})

router.get("/bookmarks/new", (req, res) => {
  res.render("users/newplaylist")
})

router.post("/bookmarks/new", (req, res) => {
  Playlist.create({ ownerID: req.session.currentUser._id, userName: req.session.currentUser.username, playlistName: req.body.playlistname })
    .then(() => {
      res.redirect('/playlists/bookmarked')
    })
})

router.post("/bookmarks/:episodeID", (req, res) => {
  // console.log("2CHECKTHID OUTTOTUTOUT" + req.body.selectpicker)
  let addTo = Playlist.findOneAndUpdate(
    { $and: [{ ownerID: req.session.currentUser._id }, { playlistName: req.body.selectpicker }] },
    { $push: { episodes: { episodeID: req.params.episodeID } } })


  let deleteFrom =
    Playlist.findOneAndUpdate(
      { $and: [{ ownerID: req.session.currentUser._id }, { playlistName: "Bookmarked" }] },
      { $pull: { episodes: { episodeID: req.params.episodeID } } })

  Promise.all([addTo, deleteFrom]).then((response) => {
    res.redirect('/playlists/bookmarked')
  })
})

module.exports = router;








