import { Loading } from "../../components/Loading/Loading";
import { API } from "../../utils/API/API";
import { createPage } from "../../utils/functions/createPage";
import { Pagination } from "../../components/Pagination/Pagination";
import { renderChampionCard } from "../../utils/functions/renderChampionCard";
import {
  addToFavourites,
  getFavourites,
} from "../../utils/functions/addToFavourites";

import "./Champions.css";
import "../Champions/ChampionsPosition.css";

export const Champions = async () => {
  const div = createPage("champions");

  const token = localStorage.getItem("token"); // Comprobar si el usuario está logueado

  if (!token) {
    div.innerHTML = "";

    const loginContainer = document.createElement("div");
    const h3 = document.createElement("h3");
    const link = document.createElement("a");

    loginContainer.classList.add("login-container");
    link.textContent = "Register/Login";
    link.href = "#"; // Evitar redireccionamiento por defecto del navegador
    h3.textContent = "to be able to see all the Champions.";

    // Agregar un evento para manejar la navegación con `navigate`
    link.addEventListener("click", (e) => {
      const loginRoute = routes.find((route) => route.path === "/login");
      if (loginRoute) {
        navigate(e, loginRoute); // Usa navigate para redirigir al login
      }
    });

    loginContainer.append(link, h3);
    div.appendChild(loginContainer);
    return; // No continuar ejecutando el código
  }

  // Si está logueado, mostrar el contenido de los campeones
  const loadingComponent = Loading();
  div.appendChild(loadingComponent);

  try {
    const Champions = await API({
      endpoint: "/champions",
      token, // Pasar el token al API
    });

    const orderedChampions = Champions.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    const pageSize = 10;
    let currentPage = 1;
    const totalPages = Math.ceil(orderedChampions.length / pageSize);

    div.innerHTML = ""; // Limpiar el contenido antes de mostrar los campeones

    const renderPage = (page) => {
      div.innerHTML = "";
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const championsToShow = orderedChampions.slice(start, end);

      championsToShow.forEach((champion) => {
        const isFavourite = getFavourites().some(
          (fav) => fav.name === champion.name
        );
        div.appendChild(
          renderChampionCard(champion, addToFavourites, isFavourite)
        );
      });

      const paginationComponent = Pagination({
        currentPage,
        totalPages,
        onPageChange: (newPage) => {
          currentPage = newPage;
          renderPage(currentPage);
        },
      });

      div.appendChild(paginationComponent);
    };

    renderPage(currentPage);
  } catch (error) {
    div.innerHTML = `<p>Error loading champions: ${error.message}</p>`;
  } finally {
    loadingComponent.style.display = "none";
  }
};
