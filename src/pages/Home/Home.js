import { createPage } from "../../utils/functions/createPage";
import { routes } from "../../utils/routes/routes";
import { navigate } from "../../utils/functions/navigate";

import "./Home.css";

export const Home = () => {
  const div = createPage("home");
  div.innerHTML = `
    <div class="home-header">
        <video muted autoplay loop >
          <source src="/assets/videoHome.webm" type="video/webm">
        </video>
      <div class="capa"></div>
    </div>
  `;

  const loginContainer = document.createElement("div");
  const img = document.createElement("img");
  const h3 = document.createElement("h3");
  const link = document.createElement("a");

  img.src = "/assets/LoLtitle.webp";
  loginContainer.classList.add("login-container");
  link.textContent = "Sign Up/Login";
  link.href = "#";
  h3.textContent = "to see all the Champions.";

  link.addEventListener("click", (e) => {
    const loginRoute = routes.find((route) => route.path === "/login");
    if (loginRoute) {
      navigate(e, loginRoute);
    }
  });

  loginContainer.append(img, link, h3);
  div.appendChild(loginContainer);
};
