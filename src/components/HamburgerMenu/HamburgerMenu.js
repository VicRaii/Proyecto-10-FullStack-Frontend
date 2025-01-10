import { navigate } from "../../utils/functions/navigate";
import { routes } from "../../utils/routes/routes";
import "./HamburgerMenu.css";

export const HamburgerMenu = () => {
  const nav = document.createElement("nav");
  const ul = document.createElement("ul");

  const hamburgerButton = document.createElement("button");
  hamburgerButton.classList.add("hamburger-button");

  const bar1 = document.createElement("div");
  bar1.classList.add("bar", "bar1");
  const bar2 = document.createElement("div");
  bar2.classList.add("bar", "bar2");
  const bar3 = document.createElement("div");
  bar3.classList.add("bar", "bar3");

  hamburgerButton.append(bar1, bar2, bar3);

  hamburgerButton.addEventListener("click", () => {
    ul.classList.toggle("open");
    hamburgerButton.classList.toggle("active");
  });

  const renderMenuItems = () => {
    ul.innerHTML = "";
    const token = localStorage.getItem("token");

    for (const route of routes) {
      // Omitir rutas que requieren autenticación si no hay token
      if (route.requiresAuth && !token) continue;

      const li = document.createElement("li");
      const a = document.createElement("a");

      a.textContent = route.text;
      a.href = route.path;

      if (route.text === "Logout" && token) {
        a.addEventListener("click", (e) => {
          e.preventDefault();

          localStorage.removeItem("token");
          const tokenChangeEvent = new Event("tokenChange");
          window.dispatchEvent(tokenChangeEvent);

          const loginRoute = routes.find((route) => route.path === "/login");
          if (loginRoute) {
            navigate(e, loginRoute);
          }
        });
      } else {
        a.addEventListener("click", (e) => {
          navigate(e, route);
          ul.classList.remove("open");
          hamburgerButton.classList.remove("active");
        });
      }

      li.appendChild(a);
      ul.appendChild(li);
    }
  };

  renderMenuItems();

  window.addEventListener("tokenChange", () => {
    renderMenuItems();
  });

  nav.append(hamburgerButton, ul);
  return nav;
};
