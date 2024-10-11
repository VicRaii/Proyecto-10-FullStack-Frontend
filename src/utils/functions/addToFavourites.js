import { Notification } from "../../components/Notification/Notification"; // Importar el componente de notificación
import { Favourites } from "../../pages/Favs/Favourites";

// Función para añadir o eliminar campeones de favoritos
export const addToFavourites = (champion, iconElement) => {
  const favourites = getFavourites();
  const isFavourite = favourites.some((fav) => fav.name === champion.name);

  if (isFavourite) {
    // Si ya está en favoritos, lo eliminamos
    const updatedFavourites = favourites.filter(
      (fav) => fav.name !== champion.name
    );
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));

    // Cambiar el icono a "no favorito"
    iconElement.src = "/assets/heartIcon.png"; // Ícono de corazón vacío

    // Mostrar notificación al eliminar de favoritos
    Notification(
      "https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif", // URL del GIF
      `${champion.name} removed from favourites!`
    );

    Favourites();
  } else {
    // Si no está en favoritos, lo añadimos
    favourites.push(champion);
    localStorage.setItem("favourites", JSON.stringify(favourites));

    // Cambiar el icono a "favorito"
    iconElement.src = "/assets/heartFilledIcon.png"; // Ícono de corazón lleno

    // Mostrar notificación al añadir a favoritos
    Notification(
      "https://media.tenor.com/dUCnsmkTiD8AAAAj/league-of-legends.gif", // URL del GIF
      `${champion.name} added to favourites!`
    );
  }
};

// Función para obtener los favoritos
export const getFavourites = () => {
  const favourites = localStorage.getItem("favourites");
  return favourites ? JSON.parse(favourites) : [];
};
