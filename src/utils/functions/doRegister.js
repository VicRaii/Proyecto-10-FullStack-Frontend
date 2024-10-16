import { API } from "../API/API";
import { Notification } from "../../components/Notification/Notification";
import { Champions } from "../../pages/Champions/Champions"; // Importa la página de campeones directamente

export const doRegister = async (e) => {
  e.preventDefault();

  const [userNameInput, emailInput, passwordInput] = e.target;

  const body = {
    userName: userNameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  // Realiza la llamada a la API para el registro
  const res = await API({
    endpoint: "/users/register",
    body,
    method: "POST",
  });

  // Guardar el token en el localStorage
  localStorage.setItem("token", res.token);
  console.log("Sign up successful:", res);

  // Emitir el evento 'tokenChange' para notificar al header
  const tokenChangeEvent = new Event("tokenChange");
  window.dispatchEvent(tokenChangeEvent);

  if (res.token) {
    // Mostrar la notificación con el GIF
    Notification(
      "https://media.tenor.com/dUCnsmkTiD8AAAAj/league-of-legends.gif",
      "Welcome! Sign up successful!"
    );

    // Redirigir manualmente a la página de campeones después de 2 segundos
    setTimeout(() => {
      const main = document.querySelector("main"); // Asegúrate de que "main" sea tu contenedor principal
      main.innerHTML = ""; // Limpia el contenido actual
      Champions(); // Llama a la función que renderiza la página de campeones
      window.history.pushState({}, "", "/champions"); // Cambia la URL sin recargar la página
    }, 1000);
  } else {
    // Mostrar notificación de error
    Notification(
      "https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif",
      "Sign up failed! Try again."
    );
    console.log("Sign up failed:", res);
  }
};
