import axios from "axios";

const url1 = "http://localhost:3001";
const url2 = "http://localhost:3002";
const instance = axios.create({
  baseURL: url2,
});

export { instance };
