import { Loading } from "../../components/Loading/Loading";
import { API } from "../../utils/API/API";
import { createPage } from "../../utils/functions/createPage";

import "./Champions.css";

export const Champions = async () => {
  // Crear página
  const div = createPage("champions");

  // Usar el componente Loading y añadirlo al div
  const loadingComponent = Loading();
  div.appendChild(loadingComponent);

  try {
    // Hacer la solicitud a la API
    const Champions = await API({ endpoint: "/champions" });

    // Ordenar los campeones
    const orderedChampions = Champions.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    // Limpiar el contenido del div antes de agregar los campeones
    div.innerHTML = "";

    // Mostrar los campeones
    for (const champion of orderedChampions) {
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
  } catch (error) {
    // Mostrar un mensaje de error si algo falla
    div.innerHTML = `<p>Error loading champions: ${error.message}</p>`;
  } finally {
    // Ocultar el componente loading después de que se completen las acciones
    loadingComponent.style.display = "none";
  }
};
