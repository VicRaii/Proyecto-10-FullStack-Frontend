import { createPage } from "../../utils/functions/createPage";
import { getFavourites } from "../../utils/functions/addToFavourites";
import { renderChampionCard } from "../../utils/functions/renderChampionCard";
import { addToFavourites } from "../../utils/functions/addToFavourites";
import { routes } from "../../utils/routes/routes";
import { navigate } from "../../utils/functions/navigate";
import "./Favourites.css";
import "../Champions/ChampionsPosition.css";

export const Favourites = () => {
  const div = createPage("favourites");

  const token = localStorage.getItem("token");

  if (!token) {
    div.innerHTML = "";

    const loginContainer = document.createElement("div");
    const h3 = document.createElement("h3");
    const link = document.createElement("a");

    loginContainer.classList.add("login-container");
    link.textContent = "Sign Up/Login";
    link.href = "#";
    h3.textContent = "to be able to see all the Champions.";

    link.addEventListener("click", (e) => {
      const loginRoute = routes.find((route) => route.path === "/login");
      if (loginRoute) {
        navigate(e, loginRoute);
      }
    });

    loginContainer.append(link, h3);
    div.appendChild(loginContainer);
    return;
  }

  const renderFavourites = () => {
    div.innerHTML = "";

    div.innerHTML = `<div class="favsDiv"><h1>Favourites</h1></div>`;
    const favourites = getFavourites();

    if (favourites.length === 0) {
      div.innerHTML = "<p class='noFavs'>No favourites yet</p>";
    } else {
      favourites.forEach((champion) => {
        div.appendChild(renderChampionCard(champion, addToFavourites, true));
      });
    }
  };

  renderFavourites();

  return div;
};
