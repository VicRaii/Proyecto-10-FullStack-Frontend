// components/Pagination.js
import "./Pagination.css";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const paginationDiv = document.createElement("div");
  paginationDiv.className = "pagination";

  const prevButton = document.createElement("button");
  prevButton.innerHTML = `<img id="leftArrow" src="./dist/assets/leftArrow.png" alt="left Arrow">`;
  prevButton.disabled = currentPage === 1;
  prevButton.onclick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Número de la página actual
  const pageInfo = document.createElement("span");
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  pageInfo.className = "page-info";

  const nextButton = document.createElement("button");
  nextButton.innerHTML = `<img id="rightArrow" src="./dist/assets/rightArrow.png" alt="right Arrow">`;
  nextButton.disabled = currentPage === totalPages;
  nextButton.onclick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  paginationDiv.appendChild(prevButton);
  paginationDiv.appendChild(pageInfo); // Añadimos la información de la página en el medio
  paginationDiv.appendChild(nextButton);

  return paginationDiv;
};
