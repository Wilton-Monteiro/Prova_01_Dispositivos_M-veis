import axios from "axios";

const api = axios.create({
  baseURL: "http://www.omdbapi.com",
  params: {
    apikey: "fcd9cb3d",
  },
});

export default api;
