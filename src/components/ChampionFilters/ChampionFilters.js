// components/ChampionFilters.js
import "./ChampionFilters.css"; // Asegúrate de que este archivo exista y tenga algún estilo básico

export const ChampionFilters = ({ onFilterChange }) => {
  const filterContainer = document.createElement("div");
  filterContainer.className = "champion-filters-container";

  // Añade un título o clase para ayudarte a ver el contenedor
  filterContainer.innerHTML = "<h3 class='filter'>Filter Champions</h3>";

  // Filtro por nombre
  const nameInput = document.createElement("input");
  nameInput.placeholder = "Search by name";
  nameInput.className = "champion-filter-input";

  // Filtro por rol
  const roleInput = document.createElement("select");
  roleInput.className = "champion-filter-input";
  const roles = [
    "All",
    "fighter",
    "mage",
    "support",
    "tank",
    "marksman",
    "assasin",
  ];

  roles.forEach((role) => {
    const option = document.createElement("option");
    option.value = role === "All" ? "" : role;
    option.textContent = role;
    roleInput.appendChild(option);
  });

  // Función para manejar cambios en los filtros
  const handleFilterChange = () => {
    const filters = {
      name: nameInput.value.toLowerCase(),
      role: roleInput.value,
    };
    onFilterChange(filters);
  };

  // Añadir los eventos de cambio a los inputs
  nameInput.addEventListener("input", handleFilterChange);
  roleInput.addEventListener("change", handleFilterChange);

  // Agregar los inputs al contenedor
  filterContainer.appendChild(nameInput);
  filterContainer.appendChild(roleInput);

  return filterContainer;
};
