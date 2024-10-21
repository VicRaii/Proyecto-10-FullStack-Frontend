export const toggleFavourite = (champion) => {
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  const isFavourite = favourites.some(
    (favChampion) => favChampion.name === champion.name
  );

  if (isFavourite) {
    const updatedFavourites = favourites.filter(
      (favChampion) => favChampion.name !== champion.name
    );
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    alert(`${champion.name} fue eliminado de favoritos.`);
  } else {
    favourites.push(champion);
    localStorage.setItem("favourites", JSON.stringify(favourites));
    alert(`${champion.name} fue añadido a favoritos.`);
  }
};
