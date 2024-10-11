import "./Loading.css";
export const Loading = () => {
  const loadingContainer = document.createElement("div");
  loadingContainer.innerHTML = `
        <div class="loader">
            <div data-glitch="Loading Champions..." class="glitch">Loading...</div>
        </div>

  `;

  return loadingContainer;
};
