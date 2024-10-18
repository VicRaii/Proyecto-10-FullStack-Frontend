import { Notification } from "../../components/Notification/Notification"; // Importar el componente de notificación
import { Favourites } from "../../pages/Favs/Favourites"; // Importa la función para renderizar los favoritos

export const addToFavourites = (champion, iconElement) => {
  const userName = localStorage.getItem("userName"); // Obtener el nombre de usuario del localStorage
  if (!userName) {
    Notification(
      "https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif",
      "You need to log in to manage favourites!"
    );
    return; // Si no hay usuario logueado, detenemos la función
  }

  const favourites = getFavourites(); // Obtener favoritos del usuario actual
  const isFavourite = favourites.some((fav) => fav.name === champion.name);

  if (isFavourite) {
    // Si ya está en favoritos, lo eliminamos
    const updatedFavourites = favourites.filter(
      (fav) => fav.name !== champion.name
    );
    localStorage.setItem(
      `favourites_${userName}`,
      JSON.stringify(updatedFavourites)
    );

    // Cambiar el icono a "no favorito"
    iconElement.src = "/assets/heartIcon.png"; // Ícono de corazón vacío

    // Mostrar notificación al eliminar de favoritos
    Notification(
      "https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif",
      `${champion.name} removed from favourites!`
    );
  } else {
    // Si no está en favoritos, lo añadimos
    favourites.push(champion);
    localStorage.setItem(`favourites_${userName}`, JSON.stringify(favourites));

    // Cambiar el icono a "favorito"
    iconElement.src = "/assets/heartFilledIcon.png"; // Ícono de corazón lleno

    // Mostrar notificación al añadir a favoritos
    Notification(
      "https://media.tenor.com/dUCnsmkTiD8AAAAj/league-of-legends.gif",
      `${champion.name} added to favourites!`
    );
  }

  // Verificar si estamos en la página de favoritos antes de renderizar
  if (window.location.pathname === "/favourites") {
    Favourites(); // Volver a renderizar los favoritos solo si estamos en la página
  }
};

export const getFavourites = () => {
  const userName = localStorage.getItem("userName"); // Obtener el nombre de usuario del localStorage
  if (!userName) {
    return []; // Si no hay usuario logueado, devolvemos un array vacío
  }

  // Obtener los favoritos del usuario específico
  const favourites = localStorage.getItem(`favourites_${userName}`);
  return favourites ? JSON.parse(favourites) : [];
};
