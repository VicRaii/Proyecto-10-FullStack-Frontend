import { createPage } from "../../utils/functions/createPage";
import { navigate } from "../../utils/functions/navigate";
import { routes } from "../../utils/routes/routes";

import "./Home.css";

export const Home = () => {
  const div = createPage("home");
  div.innerHTML = `
      <div class="home-header">
          <h4> CHOOSE YOUR </h4>
          <h1> CHAMPION </h1>
          <p> With more than 140 champions, you'll find the perfect match for your playstyle. <br> Master one, or master them all.</p>
      </div>
  `;
  const loginContainer = document.createElement("div");
  const h3 = document.createElement("h3");
  const link = document.createElement("a");

  loginContainer.classList.add("login-container");
  link.textContent = "Register/Login";
  link.href = routes.path;
  h3.textContent = "to be able to see all the Champions.";

  link.addEventListener("click", (e) => navigate(e, routes));

  loginContainer.append(link, h3);
  div.appendChild(loginContainer);
};
