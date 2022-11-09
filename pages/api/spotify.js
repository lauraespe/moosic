import SpotifyWebApi from "spotify-web-api-node";

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: "a9d5d4bffc7b4d9bbb6200892dab5f56",
  clientSecret: "63929b50610a4e2582936b436a24059a",
  redirectUri: "http://localhost:3000",
});

export default function handler(req, res) {
  // The code that's returned as a query parameter to the redirect URI
  const code = req.body.code;
  console.log(code);

  // Retrieve an access token and a refresh token
  spotifyApi.authorizationCodeGrant(code).then(
    function (data) {
      console.log("The token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);
      console.log("The refresh token is " + data.body["refresh_token"]);

      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(data.body["access_token"]);
      spotifyApi.setRefreshToken(data.body["refresh_token"]);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );

  // Get Elvis' albums
  spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
    function (data) {
      res.status(200).json(data.body);
    },
    function (err) {
      res.status(400).json({ error: "Error" });
    }
  );
}
