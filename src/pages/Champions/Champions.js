import { API } from "../../utils/API/API";
import { createPage } from "../../utils/functions/createPage";
import "./Champions.css";

export const Champions = async () => {
  const div = createPage("champions");
  const Champions = await API({ endpoint: "/champions" });
  const orderedChampions = Champions.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // div.innerHTML = `
  // <div class="champion-header">
  //         <h4> CHOOSE YOUR </h4>
  //         <h1> CHAMPION </h1>
  //         <p> With more than 140 champions, you'll find the perfect match for your playstyle. Master one, or master them all.</p>
  //     </div>

  //     <div class="championsGrid">
  //       </div>
  // `;

  for (const champion of Champions) {
    div.innerHTML += `
    <div class="championsGrid" >

        <div class="card-img">
          <img src="${champion.img}" alt="${champion.name} image not found"/>
        </div>
        
        <div class="card-footer">
          <h3>${champion.name}</h3>
          <h4>#${champion.role}</h4>
        </div>
  
     </div>
    `;
  }
};
