require("dotenv").config(); // don't know what this does  // https://www.npmjs.com/package/dotenv
var fs = require("fs"); // allows you to work within the file system on node
var keys = require("./keys.js");
var moment = require('moment');
moment().format();
// var spotify = new Spotify(keys.spotify);
var Spotify = require('node-spotify-api');
var axios = require("axios");
var action = process.argv[2];
var parameter = process.argv[3];
var movieName = process.argv.slice(3).join(" ");

// --------------------------------------------------------------------------------------------------//

// Band API
var queryURL = "https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp";
function bandsInTown () {
  axios.get(queryURL).then(
    function (response) {
      for (var i = 0; i < 5; i++) {                                                 
        // If the axios was successful...
        // Then log the body from the site!                            
        console.log(response.data[i].venue.name);
        console.log(response.data[i].venue.city);                 
        console.log(response.data[i].datetime);
        console.log("--------------------------------")
      }
    },
  )
}                                                           
// --------------------------------------------------------------------------------------------------//

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
function movieInfo(){
  axios.get(queryUrl).then(
    function(response) {
      console.log("------------------------------------------")
      console.log("Release Year: " + response.data.Year);
      console.log("Title: " + response.data.Title);
      console.log("Rating: " + response.data.imdbRating);
      console.log("Country: " + response.data.Country);
      console.log("Language " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors " + response.data.Actors);

      if (response.data.Ratings && response.data.Ratings[1] && response.data.Ratings[1].Source === 'Rotten Tomatoes') {
        console.log('Rotten Tomatoes rating: ' + response.data.Ratings[1].Value);
    } else {
        console.log('Rotten Tomatoes rating does not exist for some reason. Don\'t ask me why!');
    }
    }
  );
}

// --------------------------------------------------------------------------------------------------//

function spotifySong(songName){
  spotify.search({type: "track", query: songName}, function(err,data) {
    if (err) {
      console.log("error accured: " + err);
      return; 
    }
 
    console.log("artist " + data.tracks.items[0].artist[0].name);
 
  }
  );
 }


// --------------------------------------------------------------------------------------------------//
function getRandom(){
  fs.readFile("random.txt", "utf8", function(error, data){
    if(error){
      return console.log(error);
    }
    console.log(data);
    spotifySong(data);
  })

}
// --------------------------------------------------------------------------------------------------//
switch (action) {

  case "concert-this": 
    bandsInTown();
    break;

  case "spotify-this-song":
  spotifySong();
  break;

  case "movie-this":
  movieInfo();
  break;

  case "do-what-it-says":
  getRandom();
  break;

  default:
    console.log('Invalid input. Accepted inputs are: concert-this <band here>, spotify-this-song <song here>, movie-this <movie here>, or do-what-it-says');
    break;

}

// --------------------------------------------------------------------------------------------------//

