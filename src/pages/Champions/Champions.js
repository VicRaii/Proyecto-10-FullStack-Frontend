import { API } from "../../utils/API/API";
import { createPage } from "../../utils/functions/createPage";
import "./Champions.css";

export const Champions = async () => {
  const div = createPage("champions");
  const Champions = await API({ endpoint: "/champions" });
  console.log(Champions);

  for (const champion of Champions) {
    div.innerHTML += `
      <div class="champions"> 
        <div>
          <img src="${champion.img[0]}"/>
        </div>
        <h3>${champion.name}</h3>
      </div>
    `;
  }
};
