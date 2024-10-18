import { API } from "../API/API";
import { Notification } from "../../components/Notification/Notification";
import { Champions } from "../../pages/Champions/Champions"; // Importa la página de campeones directamente

export const doLogin = async (e) => {
  e.preventDefault();

  // Verificar si ya hay un usuario logueado
  const currentToken = localStorage.getItem("token");

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
    // Si ya hay un token guardado y el usuario es diferente, cerrar la sesión anterior
    const previousUser = localStorage.getItem("userName");
    if (currentToken && previousUser !== res.user.userName) {
      // Mostrar notificación de que la sesión anterior se está cerrando
      Notification(
        "https://media.tenor.com/dUCnsmkTiD8AAAAj/league-of-legends.gif",
        "Closing previous session..."
      );

      // Eliminar el token y la información del usuario anterior
      localStorage.removeItem("token");
      localStorage.removeItem("userName");

      // Dar un pequeño retraso para la notificación antes de continuar
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // Guardar el nuevo token y el nuevo nombre de usuario
    localStorage.setItem("token", res.token);
    localStorage.setItem("userName", res.user.userName);

    console.log("Login successful:", res);

    // Emitir el evento 'tokenChange' para notificar al header
    const tokenChangeEvent = new Event("tokenChange");
    window.dispatchEvent(tokenChangeEvent);

    // Mostrar la notificación con el GIF de login exitoso
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
  } else if (res.message === "User or password incorrect") {
    // Mostrar notificación de error
    Notification(
      "https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif",
      "User or password incorrect"
    );
    console.log("Login failed:", res);
  } else {
    // Mostrar notificación de error genérica
    Notification(
      "https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif",
      "Login failed!"
    );
    console.log("Login failed:", res);
  }
};
