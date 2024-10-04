import { Button } from "../../components/Button/Button";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { createPage } from "../../utils/functions/createPage";
import "./Login.css";

let showLogin = true;

export const Login = () => {
  const div = createPage("login");

  const form = document.createElement("form");

  div.appendChild(
    Button({
      text: "Registrate si no tienes cuenta",
      fnc: () => {
        showLogin = !showLogin;
        showLogin ? LoginForm(form) : RegisterForm(form);
      },
    })
  );
};
