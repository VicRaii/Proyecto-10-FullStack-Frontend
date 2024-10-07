import "./Loading.css"; // Asegúrate de que los estilos estén en un archivo separado

export const Loading = () => {
  // Crear un contenedor para el loading
  const loadingContainer = document.createElement("div");
  loadingContainer.classList.add("loading-container");

  // Crear el spinner
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");

  // Crear el texto "Cargando..."
  const loadingText = document.createElement("div");
  loadingText.classList.add("loading-text");
  loadingText.innerText = "Loading Champions...";

  // Añadir spinner y texto al contenedor
  loadingContainer.appendChild(spinner);
  loadingContainer.appendChild(loadingText);

  return loadingContainer;
};
