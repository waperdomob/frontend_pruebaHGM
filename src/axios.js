import axios from "axios";
//import jwt from "jwt-decode"
import {Buffer} from 'buffer';

const API_URL = "http://127.0.0.1:8000/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "JWT " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      );
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === API_URL + "api/token/refresh/"
    ) {
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");
      console.log(refreshToken);
      if (refreshToken) {
        //const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
        const tokenParts = JSON.parse(
          Buffer.from(refreshToken.split(".")[1], "base64").toString()
        );
        /* const tokenParts = jwt(refreshToken, {
					completed: true
				  }) */
        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post("api/token/refresh/", {
              refresh: refreshToken,
            })
            .then((response) => {
              localStorage.setItem("access_token", response.data.access_token);
              localStorage.setItem(
                "refresh_token",
                response.data.refresh_token
              );

              axiosInstance.defaults.headers["Authorization"] =
                "JWT " + response.data.access_token;
              originalRequest.headers["Authorization"] =
                "JWT " + response.data.access_token;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/login/";
          //alert("Prueba");
        }
      } else {
        console.log("Refresh token not available.");
        window.location.href = "/login/";
        //alert("Prueba2");
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;