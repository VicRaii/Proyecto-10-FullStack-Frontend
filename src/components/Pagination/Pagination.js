// Pagination.js
import "./Pagination.css"; // Puedes crear tu CSS de paginación aquí

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const paginationDiv = document.createElement("div");
  paginationDiv.className = "pagination";

  // Botón de página anterior
  const prevButton = document.createElement("button");
  prevButton.innerHTML = `<i class="fas fa-arrow-left"></i> Anterior`;
  prevButton.disabled = currentPage === 1; // Deshabilitar si estamos en la primera página
  prevButton.onclick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Botón de página siguiente
  const nextButton = document.createElement("button");
  nextButton.innerHTML = `Siguiente <i class="fas fa-arrow-right"></i>`;
  nextButton.disabled = currentPage === totalPages; // Deshabilitar si estamos en la última página
  nextButton.onclick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Agregar los botones al div de paginación
  paginationDiv.appendChild(prevButton);
  paginationDiv.appendChild(nextButton);

  return paginationDiv;
};
