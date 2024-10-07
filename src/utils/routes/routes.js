import { Champions } from "../../pages/Champions/Champions";
import { Favorites } from "../../pages/Favs/Favorites";
import { Home } from "../../pages/Home/Home";
import { Login } from "../../pages/Login/Login";
import { Logout } from "../../pages/Logout/Logout";

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
    path: "/favorites",
    text: "Favorites",
    page: Favorites,
  },
  {
    path: "/login",
    text: "Register / Login",
    page: Login,
  },
  {
    path: "/logout",
    text: "Logout",
    page: Logout,
  },
];
