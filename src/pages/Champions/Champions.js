import { Loading } from "../../components/Loading/Loading";
import { API } from "../../utils/API/API";
import { createPage } from "../../utils/functions/createPage";

import "./Champions.css";

export const Champions = async () => {
  const div = createPage("champions");

  const loadingComponent = Loading();
  div.appendChild(loadingComponent);

  try {
    const Champions = await API({ endpoint: "/champions" });

    const orderedChampions = Champions.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    div.innerHTML = "";

    for (const champion of orderedChampions) {
      div.innerHTML += `
        <div class="championsGrid" >
          <div class="card-img">
            <img src="${champion.img}" alt="${champion.name} image not found"/>
          </div>
          <div class="card-footer">
            <h3>${champion.name}</h3>
                <div class="likeIcon"><img src="./public/assets/likeicon.png" alt="like"></div>
            <h4>#${champion.role}</h4>
          </div>
        </div>
      `;
    }
  } catch (error) {
    div.innerHTML = `<p>Error loading champions: ${error.message}</p>`;
  } finally {
    loadingComponent.style.display = "none";
  }
};
