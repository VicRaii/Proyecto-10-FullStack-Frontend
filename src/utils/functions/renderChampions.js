import { Pagination } from "../../components/Pagination/Pagination";

export const RenderChampions = ({
  div,
  champions,
  currentPage,
  pageSize,
  totalPages,
  onPageChange,
}) => {
  div.innerHTML = "";

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const championsToShow = champions.slice(start, end);

  for (const champion of championsToShow) {
    div.innerHTML += `
      <div class="championsGrid" >
        <div class="card-img">
          <img id="${champion.name
            .trim()
            .replace("'", "-")
            .replace(" ", "-")
            .replace(".", "-")
            .replace("&", "-")}" src="${champion.img}" 
            alt="${champion.name} image not found"/>
        </div>
        <div class="card-footer">
          <h3>${champion.name}</h3>
          <div class="likeIcon"><img src="/assets/heartIcon.png" alt="like"></div>
          <h4>#${champion.role}</h4>
        </div>
      </div>
    `;
  }

  const paginationComponent = Pagination({
    currentPage,
    totalPages,
    onPageChange,
  });

  div.appendChild(paginationComponent);
};
