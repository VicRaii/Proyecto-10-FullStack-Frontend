import { createPage } from "../../utils/functions/createPage";
import "./Favorites.css";

export const Favorites = () => {
  const div = createPage("favorites");

  div.innerHTML = `
    <section id="favs">
            <h1>Favorites</h1>
        <ul id="championscontainer">
       </ul>
    </section>
`;

  const getFavs = async () => {
    const userId = JSON.parse(localStorage.getItem("user")).user._id;
    const championsData = await fetch(
      `http://localhost:3000/api/v1/users/${userId}`
    );
    const data = await championsData.json();
    const champions = data.favorites;
    const championsContainer = document.querySelector("#championscontainer");
    for (const champion of champions) {
      const li = document.createElement("li");
      li.innerHTML = `
    <img src=${champion.caratula} alt=${champion.titulo}/>
    <h3>${champion.titulo}</h3>
    <h4>${champion.autor}</h4>
    <h5>${champion.valoracion}</h5>
    <h5>${champion.precio}€</h5>
    `;
      championsContainer.appendChild(li);
    }
  };

  const Favs = () => {
    document.querySelector("main").innerHTML = template();
    getFavs();
  };
};
