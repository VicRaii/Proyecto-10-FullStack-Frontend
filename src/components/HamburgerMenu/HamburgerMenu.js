// HamburgerMenu.js
import { navigate } from "../../utils/functions/navigate";
import { routes } from "../../utils/routes/routes";
import "./HamburgerMenu.css"; // Asegúrate de que tenga sus propios estilos si es necesario

export const HamburgerMenu = () => {
  const nav = document.createElement("nav");
  const ul = document.createElement("ul");

  // Crear botón de menú hamburguesa
  const hamburgerButton = document.createElement("button");
  hamburgerButton.classList.add("hamburger-button");

  // Crear las 3 barras del botón hamburguesa
  const bar1 = document.createElement("div");
  bar1.classList.add("bar", "bar1");
  const bar2 = document.createElement("div");
  bar2.classList.add("bar", "bar2");
  const bar3 = document.createElement("div");
  bar3.classList.add("bar", "bar3");

  // Añadir barras al botón hamburguesa
  hamburgerButton.append(bar1, bar2, bar3);

  // Toggle del menú hamburguesa
  hamburgerButton.addEventListener("click", () => {
    ul.classList.toggle("open");
    hamburgerButton.classList.toggle("active"); // Cambia el icono de hamburguesa a "X"
  });

  for (const route of routes) {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.addEventListener("click", (e) => {
      navigate(e, route);
      ul.classList.remove("open"); // Cierra el menú al hacer clic en un enlace
      hamburgerButton.classList.remove("active"); // Restablece el botón a hamburguesa
    });

    ul.classList.add("abanico");
    a.textContent = route.text;
    a.href = route.path;
    li.appendChild(a);
    ul.append(li);
  }

  nav.append(hamburgerButton, ul);
  return nav;
};
