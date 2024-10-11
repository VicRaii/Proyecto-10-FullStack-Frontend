export const toggleFavourite = (champion) => {
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  // Verificar si el campeón ya está en la lista de favoritos
  const isFavourite = favourites.some(
    (favChampion) => favChampion.name === champion.name
  );

  if (isFavourite) {
    // Eliminar de favoritos si ya está en la lista
    const updatedFavourites = favourites.filter(
      (favChampion) => favChampion.name !== champion.name
    );
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    alert(`${champion.name} fue eliminado de favoritos.`);
  } else {
    // Agregar a favoritos
    favourites.push(champion);
    localStorage.setItem("favourites", JSON.stringify(favourites));
    alert(`${champion.name} fue añadido a favoritos.`);
  }
};
