import axios from "axios";
import { BASE_API } from "../constants/app";
const Http = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
})

export default Http;