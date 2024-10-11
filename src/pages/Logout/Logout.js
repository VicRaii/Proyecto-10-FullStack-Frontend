import { Notification } from "../../components/Notification/Notification";
import { Login } from "../../pages/Login/Login";

import "./Logout.css";

export const Logout = async () => {
  const div = createPage("logout");

  const doLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem("token");

    // Mostrar la notificación de logout exitoso
    Notification(
      "https://media.tenor.com/6j5i9wbuujwAAAAj/bye-bye.gif", // Cambia la URL del GIF si prefieres otro
      "Logout successful!"
    );

    // Redirigir a la página de login o home después de 2 segundos
    setTimeout(() => {
      const rootDiv = document.getElementById("root");
      rootDiv.innerHTML = "";
      Login(); // Redirige al login o usa Home() si prefieres la página de inicio
      window.history.pushState({}, "", "/login"); // O "/home" si rediriges al home
    }, 2000);
  };
};
