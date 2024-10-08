import { Loading } from "../../components/Loading/Loading";
import { API } from "../../utils/API/API";
import { createPage } from "../../utils/functions/createPage";
import { Pagination } from "../../components/Pagination/Pagination";

import "./Champions.css";
import "../Champions/ChampionsPosition.css";

export const Champions = async () => {
  const div = createPage("champions");

  const loadingComponent = Loading();
  div.appendChild(loadingComponent);

  try {
    const Champions = await API({ endpoint: "/champions" });

    const orderedChampions = Champions.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    const pageSize = 10; // Mostrar 10 campeones por página
    let currentPage = 1; // Página actual
    const totalPages = Math.ceil(orderedChampions.length / pageSize); // Número total de páginas

    div.innerHTML = ""; // Limpiar el contenido

    // Función para renderizar la página actual
    const renderPage = (page) => {
      div.innerHTML = ""; // Limpiar el contenido
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const championsToShow = orderedChampions.slice(start, end); // Obtener los campeones para la página actual

      for (const champion of championsToShow) {
        div.innerHTML += `
          <div class="championsGrid" >
            <div class="card-img">
              <img id="${champion.name
                .trim()
                .replace("'", "-")
                .replace(" ", "-")
                .replace(".", "-")
                .replace("&", "-")}" src="${champion.img}" 
                alt="${champion.name} image not found"/>
            </div>
            <div class="card-footer">
              <h3>${champion.name}</h3>
              <div class="likeIcon"><img src="./public/assets/heartIcon.png" alt="like"></div>
              <h4>#${champion.role}</h4>
            </div>
          </div>
        `;
      }

      // Crear la paginación usando el componente de Pagination
      const paginationComponent = Pagination({
        currentPage,
        totalPages,
        onPageChange: (newPage) => {
          currentPage = newPage;
          renderPage(currentPage); // Llamar de nuevo para renderizar la página actualizada
        },
      });

      // Agregar el componente de paginación al contenedor principal
      div.appendChild(paginationComponent);
    };

    // Renderizar la primera página al cargar
    renderPage(currentPage);
  } catch (error) {
    div.innerHTML = `<p>Error loading champions: ${error.message}</p>`;
  } finally {
    loadingComponent.style.display = "none";
  }
};
