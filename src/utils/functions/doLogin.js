import { API } from "../API/API";
import { Notification } from "../../components/Notification/Notification";
import { Champions } from "../../pages/Champions/Champions"; // Importa la página de campeones directamente

export const doLogin = async (e) => {
  e.preventDefault();
  const [userNameInput, passwordInput] = e.target;

  const body = {
    userName: userNameInput.value,
    password: passwordInput.value,
  };

  // Realiza la llamada a la API para el login
  const res = await API({
    endpoint: "/users/login",
    body,
    method: "POST",
  });

  if (res.token) {
    // Guardar el token en el localStorage
    localStorage.setItem("token", res.token);
    console.log("Login successful:", res);

    // Emitir el evento 'tokenChange' para notificar al header
    const tokenChangeEvent = new Event("tokenChange");
    window.dispatchEvent(tokenChangeEvent);

    // Mostrar la notificación con el GIF
    Notification(
      "https://media.tenor.com/dUCnsmkTiD8AAAAj/league-of-legends.gif",
      "Login successful!"
    );

    // Redirigir manualmente a la página de campeones después de 2 segundos
    setTimeout(() => {
      const main = document.querySelector("main"); // Asegúrate de que "root" sea tu contenedor principal
      main.innerHTML = ""; // Limpia el contenido actual
      Champions(); // Llama a la función que renderiza la página de campeones
      window.history.pushState({}, "", "/champions"); // Cambia la URL sin recargar la página
    }, 1000);
  } else {
    // Mostrar notificación de error
    Notification(
      "https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif",
      "Login Failed!"
    );
    console.log("Login failed:", res);
  }
};
