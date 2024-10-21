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

  console.log(body);

  try {
    // Realiza la llamada a la API para el registro
    const res = await API({
      endpoint: "/users/register",
      body,
      method: "POST",
    });

    // Log para ver la respuesta completa de la API
    console.log("API response:", res.message);

    // Verificar si el registro fue exitoso
    if (res._id) {
      console.log("Sign up successful:", res);

      // Mostrar la notificación de registro exitoso
      Notification(
        "https://media.tenor.com/dUCnsmkTiD8AAAAj/league-of-legends.gif",
        "Welcome! Sign up successful!"
      );

      // Realizar login automáticamente después del registro
      const loginBody = {
        userName: userNameInput.value,
        password: passwordInput.value,
      };

      const loginRes = await API({
        endpoint: "/users/login",
        body: loginBody,
        method: "POST",
      });

      console.log(loginRes.message);
      // Guardar el token en localStorage si el login es exitoso
      if (loginRes.token) {
        localStorage.setItem("token", loginRes.token);

        // Emitir el evento 'tokenChange' para notificar al header
        const tokenChangeEvent = new Event("tokenChange");
        window.dispatchEvent(tokenChangeEvent);

        // Redirigir manualmente a la página de campeones
        setTimeout(() => {
          const main = document.querySelector("main"); // Asegúrate de que "main" sea tu contenedor principal
          main.innerHTML = ""; // Limpia el contenido actual
          Champions(); // Llama a la función que renderiza la página de campeones
          window.history.pushState({}, "", "/champions"); // Cambia la URL sin recargar la página
        }, 1000);
      } else {
        throw new Error("Login failed after registration");
      }
    } else {
      throw new Error("Sign up failed! Unknown error.");
    }
  } catch (error) {
    // Mostrar la notificación de error
    Notification(
      "https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif",
      `Sign up or login failed: ${error.message}`
    );
    console.error("Sign up or login failed:", error);
  }
};
