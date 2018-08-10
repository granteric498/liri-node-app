# liri-node-app

This application is called LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

In node, you can input the following commands which will prompt the following information:

1. node liri.js my-tweets
  a. This will show my last 20 tweets and when they were created in your terminal/bash window.
  b. NOTE: The tweets come from an alias account to avoid providing personal information.
2. node liri.js spotify-this-song '<song name here>'
  a. This will show the following information about the song in your terminal/bash window:
    - Song name
    - Artist(s)
    - Album
    - Song's Spotify URL
  b. If no song is provided, the default song is "The Sign" by Ace of Base.
3. node liri.js movie-this '<movie name here>'
  a. This will show the following information about the movie in your terminal/bash window:
    - Title of the movie.
    - Year the movie came out.
    - IMDB Rating of the movie.
    - Rotten Tomatoes Rating of the movie.
    - Country where the movie was produced.
    - Language of the movie.
    - Plot of the movie.
    - Actors in the movie.
  b. If no movie is provided, the default movie is "Mr. Nobody" (2009).
4. node liri.js do-what-it-says
  a. This is a random function, which is defaulted to provide information about the song, "I Want It That Way" by the Backstreet Boys.
