require("dotenv").config();

var keys = require("./keys");
var request = require("request");
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});
var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
var fs = require("fs");

fs.appendFile("log.txt", process.argv[2] + " " + process.argv[3] + "\n", function(err) {
    if (err) {
      console.log(err);
    }
});

// Switch controller to determine Twitter, Spotify, OMDB, or random.txt
switch (process.argv[2]) {

    // Twitter API
    case 'my-tweets': 
        var params = {screen_name: process.argv[3]};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                for (var i in tweets) {   
                    console.log(tweets[i].text);
                }
            }
        });
    break;

    // Spotify API
    case 'spotify-this-song': 
        var query = "";
        // If user doesn't define song title, then default song will be "The Sign" by Ace of Base
        if (process.argv[3] === undefined) {
            query = "The Sign Ace of Base";
        
        // Else, query will be the data the user types in quotes
        } else {
            query = process.argv[3];
        }
        spotify.search({ type: 'track', query: query, limit:1 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Song URL: " + data.tracks.items[0].external_urls.spotify);
        });
    break;

    // OMDB API
    case 'movie-this': 
        if (process.argv[3] === undefined) {
            // If user doesn't define movie title, then default will be "Mr. Nobody"
            var queryUrl = "http://www.omdbapi.com/?t=Mr-Nobody&y=&plot=short&apikey=trilogy";
            console.log("If you haven't watched 'Mr. Nobody,' then you should: " + queryUrl);
            console.log("It's on Netflix!");
        
        // Else, query will be the data the user types in quotes
        } else {
            var movieName = process.argv[3];
            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        }
        request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country produced: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            }
        });
    break;

    // random.txt
    case 'do-what-it-says':
        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
                return console.log(error);
            }
            // Display the text in random.txt
            console.log(data);
            
            // Spotify call for "I Want It That Way"
            spotify.search({ type: 'track', query: data, limit:1 }, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("Song Name: " + data.tracks.items[0].name);
                console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("Song URL: " + data.tracks.items[0].external_urls.spotify);
            });
        })
    break;
}