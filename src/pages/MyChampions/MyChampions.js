import "./MyChampions.css";
import { createPage } from "../../utils/functions/createPage";
import { API } from "../../utils/API/API";
import { Notification } from "../../components/Notification/Notification";

export const MyChampions = async () => {
  const div = createPage("user-champions");
  const title = document.createElement("h2");
  title.textContent = "Your Champions";
  title.classList.add("myChampions-title");

  const championList = document.createElement("div");
  championList.classList.add("champion-list");

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      Notification(
        "https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif",
        "You must be logged in to view your champions!"
      );
      return;
    }

    // Fetch champions created by the user
    const res = await API({
      endpoint: "/champions/my-champions",
      method: "GET",
      token,
    });

    if (!res.length) {
      const noChampions = document.createElement("p");
      noChampions.textContent = "You haven't created any champions yet!";
      noChampions.classList.add("no-champions-paragraph");
      championList.appendChild(noChampions);
    } else {
      res.forEach((champion) => {
        const championCard = document.createElement("div");
        championCard.classList.add("champion-card");

        const championImage = document.createElement("img");
        championImage.src = champion.image;
        championImage.alt = champion.name;
        championImage.classList.add("champion-image");

        const championName = document.createElement("h3");
        championName.textContent = champion.name;

        const championRole = document.createElement("p");
        championRole.textContent = `Role: ${champion.role}`;

        championCard.append(championImage, championName, championRole);
        championList.appendChild(championCard);
      });
    }
  } catch (error) {
    Notification(
      "https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif",
      `Error fetching champions: ${error.message}`
    );
    console.error("Error fetching champions:", error);
  }

  div.append(title, championList);
};
