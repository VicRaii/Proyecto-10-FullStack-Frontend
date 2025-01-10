import { Champions } from "../../pages/Champions/Champions";
import { CreateChampion } from "../../pages/Create Champion/CreateChampion";
import { Favourites } from "../../pages/Favs/Favourites";
import { Home } from "../../pages/Home/Home";
import { Login } from "../../pages/Login/Login";
import { MyChampions } from "../../pages/MyChampions/MyChampions";
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
    requiresAuth: true,
  },
  {
    path: "/create-champion",
    text: "Create Champion",
    page: CreateChampion,
    requiresAuth: true,
  },
  {
    path: "/user-champions",
    text: "My Champions",
    page: MyChampions,
    requiresAuth: true,
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
