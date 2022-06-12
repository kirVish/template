const AuthEndPoint = "https://accounts.spotify.com/authorize";
const clienID = "b478f6d585864f419557df12e7089368";
const redirectUri = "http://localhost:3000/";
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "streaming",
  "app-remote-control",
];

export const loginUrl = `${AuthEndPoint}?redirect_uri=${redirectUri}&client_id=${clienID}&response_type=token&scope=${scopes.join(
  "%20"
)}`; //&show_dialog=true

export const getTokenFromUrl = () => window.location.hash.match(/(?<=access_token=)[^]*?(?=&)/)?.[0]
