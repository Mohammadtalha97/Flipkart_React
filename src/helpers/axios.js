import axios from "axios";

import { api } from "../urlConfig";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    authorization: token ? `Beare ${token}` : ``,
  },
});

export default axiosInstance;

//can not import outside from src in create-react-app
//do eject and remove ModuleScopePlugin from webpack configuration file.
