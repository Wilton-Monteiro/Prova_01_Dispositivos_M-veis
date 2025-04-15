import axios from "axios";

const api = axios.create({
  baseURL: "http://www.omdbapi.com",
  params: {
    apikey: "fcd9cb3d", // sua chave da OMDb
  },
});

export default api;
