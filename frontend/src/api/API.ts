import axios from "axios";

const URL = import.meta.env.VITE_API_URL || 'localhost:3000'

const API = axios.create({
  baseURL: URL,
})

export default API;
