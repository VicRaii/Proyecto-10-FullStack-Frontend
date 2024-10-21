import { Notification } from "../../components/Notification/Notification";
import { Login } from "../../pages/Login/Login";
import { createPage } from "./createPage";

export const Logout = () => {
  const div = createPage("logout");

  div.innerHTML = "";

  const doLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    Notification(
      "https://media.tenor.com/msScTSOe1lQAAAAj/braum-league.gif",
      "See You Soon!"
    );

    setTimeout(() => {
      const main = document.querySelector("main");
      main.innerHTML = "";
      Login();
      window.history.pushState({}, "", "/login");
    }, 1000);
  };

  doLogout();

  return div;
};
