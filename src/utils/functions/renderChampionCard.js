// utils/renderChampionCard.js

export const renderChampionCard = (champion, addToFavourites, isFavourite) => {
  const championDiv = document.createElement("div");
  championDiv.className = "championsGrid";

  // Card content
  championDiv.innerHTML = `
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
      <div class="likeIcon">
        <img src="${
          isFavourite ? "/assets/heartFilledIcon.png" : "/assets/heartIcon.png"
        }" alt="like" />
      </div>
      <h4>#${champion.role}</h4>
    </div>
  `;

  // Add event listener to the favourite icon
  const favouriteIcon = championDiv.querySelector(".likeIcon img");

  if (favouriteIcon) {
    favouriteIcon.onclick = () => addToFavourites(champion, favouriteIcon);
  } else {
    console.error("Favourite icon not found for champion:", champion.name);
  }

  return championDiv;
};
