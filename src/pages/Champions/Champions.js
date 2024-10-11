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

  const loadingComponent = Loading();
  div.appendChild(loadingComponent);

  try {
    const Champions = await API({
      endpoint: "/champions",
      token: localStorage.getItem("token"),
    });

    const orderedChampions = Champions.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    const pageSize = 10;
    let currentPage = 1;
    const totalPages = Math.ceil(orderedChampions.length / pageSize);

    div.innerHTML = "";

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
