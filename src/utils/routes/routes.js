import { Champions } from "../../pages/Champions/Champions";
import { Favourites } from "../../pages/Favs/Favourites";
import { Home } from "../../pages/Home/Home";
import { Login } from "../../pages/Login/Login";
import { Logout } from "../functions/Logout";

export const routes = [
  {
    path: "/",
    text: "Home",
    page: Home,
  },
  {
    path: "/champions",
    text: "Champions",
    page: Champions,
  },
  {
    path: "/favourites",
    text: "Favourites",
    page: Favourites,
  },
  {
    path: "/login",
    text: "Sign Up / Login",
    page: Login,
  },
  {
    path: "/logout",
    text: "Logout",
    page: Logout,
  },
];
