export const SOCKET_URL = "/api/socket";
export const NOTION_OAUTH_PATH = "https://api.notion.com/v1/oauth/authorize";
export const NOTION_OAUTH_CLIENT_ID = "72c880dd-b3c5-41b2-b4b1-bf6a6ce44084";

// central admin api
export const adminApi =
  process.env.NODE_ENV == "production"
    ? "https://admin.protoflow.ai"
    : "http://localhost:3001";

export const PATH_NAMES = {
  // pre auth paths
  preAuthPath: {
    login: "/login",
    signup: "/signup",
    home: "/"
  },
  // post auth paths
  postAuthPath: {
    home: "/user"
  }
}