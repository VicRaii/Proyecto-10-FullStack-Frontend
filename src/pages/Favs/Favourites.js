import { createPage } from "../../utils/functions/createPage";
import { getFavourites } from "../../utils/functions/addToFavourites";
import { renderChampionCard } from "../../utils/functions/renderChampionCard"; // Reutilizamos el renderizado de la tarjeta
import { addToFavourites } from "../../utils/functions/addToFavourites"; // Función para gestionar favoritos
import "./Favourites.css";

// Componente de favoritos
export const Favourites = () => {
  const div = createPage("favourites"); // Crea el contenedor para los favoritos

  // Función para renderizar la lista de favoritos
  const renderFavourites = () => {
    div.innerHTML = ""; // Limpiamos el contenido

    div.innerHTML = `<div><h1>Favourites</h1></div>`;
    // Obtener los campeones favoritos
    const favourites = getFavourites();

    if (favourites.length === 0) {
      div.innerHTML = "<p>No hay campeones favoritos aún.</p>";
    } else {
      // Mostrar los campeones favoritos usando renderChampionCard
      favourites.forEach((champion) => {
        div.appendChild(renderChampionCard(champion, addToFavourites, true));
      });
    }
  };

  // Renderizar la lista de favoritos al cargar la página
  renderFavourites();

  return div;
};
