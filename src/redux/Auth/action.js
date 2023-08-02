import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./types";
import { BASE_URL } from "../../constants/urls";
export const login = (payload) => {
  let loginData = {
    email: payload.email,
    password: payload.password,
  };
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    console.log("Mes info de connexion", loginData);
    try {
      const response = await fetch(BASE_URL +`/user/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      //console.log('resultat de la requête login', response)
      const data = await response.json();
      const token = data?.access_token || null;

      if (token) {
        dispatch({ type: LOGIN_SUCCESS, payload: data });
      } else {
        const error = data?.message || "Invalid response from server";
        dispatch({ type: LOGIN_FAILURE, payload: error });
      }
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};
