import { Button } from "../../components/Button/Button";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { createPage } from "../../utils/functions/createPage";
import { doLogin } from "../../utils/functions/doLogin";
import { doRegister } from "../../utils/functions/doRegister";
import "./Login.css";

let showLogin = true; // Estado para alternar entre login y register

export const Login = () => {
  const div = createPage("login");
  const form = document.createElement("form");

  // Botón para alternar entre Login y Registro
  const toggleButton = Button({
    text: "Don't have an account? Sign Up",
    fnc: () => {
      showLogin = !showLogin; // Alternamos entre login y register

      // Limpiamos el formulario actual antes de cargar uno nuevo
      form.innerHTML = "";

      // Cargamos el formulario correspondiente
      if (showLogin) {
        LoginForm(form);
        toggleButton.textContent = "Don't have an account? Sign Up";
        setFormSubmitEvent(doLogin); // Asignamos evento para login
      } else {
        RegisterForm(form);
        toggleButton.textContent = "Already have an account? Log in";
        setFormSubmitEvent(doRegister); // Asignamos evento para registro
      }
    },
    className: "button-toggle",
  });

  // Función para asignar el evento submit correcto al formulario
  const setFormSubmitEvent = (submitFunction) => {
    form.onsubmit = (event) => {
      event.preventDefault();
      submitFunction(event);
    };
  };

  // Inicialmente cargamos el formulario de login
  LoginForm(form);
  setFormSubmitEvent(doLogin); // Asignamos evento para login

  // Añadimos el botón de alternar y el formulario a la página
  div.append(toggleButton);
  div.append(form);
};
