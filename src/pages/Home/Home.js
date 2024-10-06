import { createPage } from "../../utils/functions/createPage";
import "./Home.css";

export const Home = () => {
  const div = createPage("home");
  div.innerHTML = `
  <div class="home-header">
          <h4> CHOOSE YOUR </h4>
          <h1> CHAMPION </h1>
          <p> With more than 140 champions, you'll find the perfect match for your playstyle. Master one, or master them all.</p>
      </div>
  `;
};
