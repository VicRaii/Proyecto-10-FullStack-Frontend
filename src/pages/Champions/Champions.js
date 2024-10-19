import { Loading } from "../../components/Loading/Loading";
import { API } from "../../utils/API/API";
import { createPage } from "../../utils/functions/createPage";
import { Pagination } from "../../components/Pagination/Pagination";
import { renderChampionCard } from "../../utils/functions/renderChampionCard";
import { ChampionFilters } from "../../components/ChampionFilters/ChampionFilters"; // Importamos el componente de filtros
import {
  addToFavourites,
  getFavourites,
} from "../../utils/functions/addToFavourites";

import "./Champions.css";
import "../Champions/ChampionsPosition.css";
import { navigate } from "../../utils/functions/navigate";
import { routes } from "../../utils/routes/routes";

export const Champions = async () => {
  const div = createPage("champions");

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

  const loadingComponent = Loading();
  div.appendChild(loadingComponent);

  try {
    const Champions = await API({
      endpoint: "/champions",
      token,
    });

    const orderedChampions = Champions.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    const pageSize = 15;
    let currentPage = 1;
    let filteredChampions = orderedChampions;

    const totalPages = () => Math.ceil(filteredChampions.length / pageSize);

    // Función para aplicar los filtros
    const applyFilters = ({ name, role }) => {
      filteredChampions = orderedChampions.filter((champion) => {
        const matchesName = champion.name.toLowerCase().includes(name);
        const matchesRole = !role || champion.role.includes(role);
        return matchesName && matchesRole;
      });

      currentPage = 1; // Reiniciar a la primera página
      renderPage(currentPage); // Renderizar la página filtrada
    };

    // Añadir el componente de filtros al principio del div (antes de los campeones)
    const filtersComponent = ChampionFilters({ onFilterChange: applyFilters });
    div.appendChild(filtersComponent);

    // Renderizar la página de campeones
    const renderPage = (page) => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const championsToShow = filteredChampions.slice(start, end);

      // No sobrescribimos los filtros, solo el contenido de los campeones
      const championsContainer = document.createElement("div");
      championsContainer.classList.add("champions-container");

      championsToShow.forEach((champion) => {
        const isFavourite = getFavourites().some(
          (fav) => fav.name === champion.name
        );
        championsContainer.appendChild(
          renderChampionCard(champion, addToFavourites, isFavourite)
        );
      });

      // Añadir la paginación después del listado de campeones
      const paginationComponent = Pagination({
        currentPage,
        totalPages: totalPages(),
        onPageChange: (newPage) => {
          currentPage = newPage;
          renderPage(currentPage);
        },
      });

      // Limpiamos solo la parte de los campeones, manteniendo los filtros
      const existingChampionsContainer = div.querySelector(
        ".champions-container"
      );
      if (existingChampionsContainer) {
        div.removeChild(existingChampionsContainer); // Remover la lista anterior de campeones
      }

      div.appendChild(championsContainer); // Agregamos la nueva lista
      div.appendChild(paginationComponent); // Agregamos la nueva paginación
    };

    renderPage(currentPage);
  } catch (error) {
    div.innerHTML = `<p>Error loading champions: ${error.message}</p>`;
  } finally {
    loadingComponent.style.display = "none";
  }
};
