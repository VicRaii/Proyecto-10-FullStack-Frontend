import "./Pagination.css";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const paginationDiv = document.createElement("div");
  paginationDiv.className = "pagination";

  const prevButton = document.createElement("button");
  prevButton.innerHTML = `<img id="leftArrow" src="/assets/leftArrow.png" alt="left Arrow">`;
  prevButton.disabled = currentPage === 1;
  prevButton.onclick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const pageInfo = document.createElement("span");
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  pageInfo.className = "page-info";

  const nextButton = document.createElement("button");
  nextButton.innerHTML = `<img id="rightArrow" src="/assets/rightArrow.png" alt="right Arrow">`;
  nextButton.disabled = currentPage === totalPages;
  nextButton.onclick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  paginationDiv.appendChild(prevButton);
  paginationDiv.appendChild(pageInfo);
  paginationDiv.appendChild(nextButton);

  return paginationDiv;
};
