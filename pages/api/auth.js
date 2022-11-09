import SpotifyWebApi from "spotify-web-api-node";

export default async function handler(req, res) {
  var scopes = ["user-read-private", "user-read-email"],
    redirectUri = "http://localhost:3000",
    clientId = "a9d5d4bffc7b4d9bbb6200892dab5f56",
    state = "some-state-of-my-choice";

  // Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
  var spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId,
  });

  // Create the authorization URL
  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

  // https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
  console.log(authorizeURL);

  res.status(200).send({ authorizeURL });
}
