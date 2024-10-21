import { Notification } from "../../components/Notification/Notification";
import { Favourites } from "../../pages/Favs/Favourites";

export const addToFavourites = (champion, iconElement) => {
  const userName = localStorage.getItem("userName");
  if (!userName) {
    Notification(
      "https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif",
      "You need to log in to manage favourites!"
    );
    return;
  }

  const favourites = getFavourites();
  const isFavourite = favourites.some((fav) => fav.name === champion.name);

  if (isFavourite) {
    const updatedFavourites = favourites.filter(
      (fav) => fav.name !== champion.name
    );
    localStorage.setItem(
      `favourites_${userName}`,
      JSON.stringify(updatedFavourites)
    );

    iconElement.src = "/assets/heartIcon.png";

    Notification(
      "https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif",
      `${champion.name} removed from favourites!`
    );
  } else {
    favourites.push(champion);
    localStorage.setItem(`favourites_${userName}`, JSON.stringify(favourites));

    iconElement.src = "/assets/heartFilledIcon.png";

    Notification(
      "https://media.tenor.com/dUCnsmkTiD8AAAAj/league-of-legends.gif",
      `${champion.name} added to favourites!`
    );
  }

  if (window.location.pathname === "/favourites") {
    Favourites();
  }
};

export const getFavourites = () => {
  const userName = localStorage.getItem("userName");
  if (!userName) {
    return [];
  }

  const favourites = localStorage.getItem(`favourites_${userName}`);
  return favourites ? JSON.parse(favourites) : [];
};
