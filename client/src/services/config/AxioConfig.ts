import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/";
const amazonPicturesGetURL = "https://dev-pb-apps.s3-eu-west-1.amazonaws.com/";

export const AxiosConfig = axios.create({
  headers: {
    "content-type": "application/json",
  },
});

export const AmazonConfig = axios.create({
  baseURL: amazonPicturesGetURL,
  headers: {
    "content-type": "application/json",
  },
});
