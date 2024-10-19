import { createPage } from "../../utils/functions/createPage";
import { getFavourites } from "../../utils/functions/addToFavourites";
import { renderChampionCard } from "../../utils/functions/renderChampionCard"; // Reutilizamos el renderizado de la tarjeta
import { addToFavourites } from "../../utils/functions/addToFavourites"; // Función para gestionar favoritos
import "./Favourites.css";
import "../Champions/ChampionsPosition.css";
import { routes } from "../../utils/routes/routes";
import { navigate } from "../../utils/functions/navigate";

// Componente de favoritos
export const Favourites = () => {
  const div = createPage("favourites");

  const token = localStorage.getItem("token"); // Comprobar si el usuario está logueado

  if (!token) {
    div.innerHTML = "";

    const loginContainer = document.createElement("div");
    const h3 = document.createElement("h3");
    const link = document.createElement("a");

    loginContainer.classList.add("login-container");
    link.textContent = "Sign Up/Login";
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
  } // Crea el contenedor para los favoritos

  // Función para renderizar la lista de favoritos
  const renderFavourites = () => {
    div.innerHTML = ""; // Limpiamos el contenido

    div.innerHTML = `<div class="favsDiv"><h1>Favourites</h1></div>`;
    // Obtener los campeones favoritos
    const favourites = getFavourites();

    if (favourites.length === 0) {
      div.innerHTML = "<p class='noFavs'>No favourites yet</p>";
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
