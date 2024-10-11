// utils/favourites.js

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
  } else {
    // Si no está en favoritos, lo añadimos
    favourites.push(champion);
    localStorage.setItem("favourites", JSON.stringify(favourites));

    // Cambiar el icono a "favorito"
    iconElement.src = "/assets/heartFilledIcon.png"; // Ícono de corazón lleno
  }
};

// Función para obtener los favoritos
export const getFavourites = () => {
  const favourites = localStorage.getItem("favourites");
  return favourites ? JSON.parse(favourites) : [];
};
