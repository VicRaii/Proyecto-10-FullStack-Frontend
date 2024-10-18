import { Notification } from "../../components/Notification/Notification";
import { Login } from "../../pages/Login/Login";
import { createPage } from "../../utils/functions/createPage"; // Asegúrate de importar esta función para crear la página

import "./Logout.css";

export const Logout = () => {
  const div = createPage("logout");

  div.innerHTML = "";

  // Ejecutar el logout automáticamente cuando se carga la página
  const doLogout = () => {
    // Eliminar todos los elementos del localStorage relacionados con el usuario
    localStorage.removeItem("token"); // Elimina el token
    localStorage.removeItem("userName"); // Si guardaste el nombre de usuario
    // Puedes eliminar otros valores almacenados de manera similar, o limpiar todo:
    // localStorage.clear(); // Esto eliminará **todos** los elementos del localStorage

    // Mostrar la notificación de logout exitoso
    Notification(
      "https://media.tenor.com/msScTSOe1lQAAAAj/braum-league.gif", // Cambia la URL del GIF si prefieres otro
      "See You Soon!"
    );

    // Redirigir a la página de login después de 2 segundos
    setTimeout(() => {
      const main = document.querySelector("main");
      main.innerHTML = "";
      Login(); // Redirige al login o usa Home() si prefieres la página de inicio
      window.history.pushState({}, "", "/login"); // O "/home" si prefieres redirigir al home
    }, 1000);
  };

  // Llamar a la función de logout cuando se carga la página
  doLogout();

  return div;
};
