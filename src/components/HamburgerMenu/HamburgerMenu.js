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

  const renderMenuItems = () => {
    ul.innerHTML = ""; // Limpiar el contenido del menú para redibujarlo

    const token = localStorage.getItem("token"); // Verifica si el usuario está logueado

    for (const route of routes) {
      const li = document.createElement("li");
      const a = document.createElement("a");

      a.addEventListener("click", (e) => {
        navigate(e, route);
        ul.classList.remove("open"); // Cierra el menú al hacer clic en un enlace
        hamburgerButton.classList.remove("active"); // Restablece el botón a hamburguesa
      });

      a.textContent = route.text;
      a.href = route.path;

      // Mostrar "Logout" solo si el usuario está logueado
      if (route.text === "Logout" && !token) {
        continue; // No agregues el botón "Logout" si no hay token
      }

      // Agregar acción de Logout
      if (route.text === "Logout") {
        a.addEventListener("click", (e) => {
          e.preventDefault();

          // Eliminar el token (logout)
          localStorage.removeItem("token");

          // Emitir el evento personalizado para actualizar el menú
          const tokenChangeEvent = new Event("tokenChange");
          window.dispatchEvent(tokenChangeEvent);

          // Redirigir al login después del logout
          const loginRoute = routes.find((route) => route.path === "/login");
          if (loginRoute) {
            navigate(e, loginRoute);
          }
        });
      }

      li.appendChild(a);
      ul.append(li);
    }
  };

  // Ejecuta renderMenuItems al iniciar
  renderMenuItems();

  // Escuchar cambios en el token para redibujar el menú
  window.addEventListener("tokenChange", () => {
    renderMenuItems();
  });

  nav.append(hamburgerButton, ul);
  return nav;
};
