import { Button } from "../../components/Button/Button";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { createPage } from "../../utils/functions/createPage";
import { doLogin } from "../../utils/functions/doLogin";
import { doRegister } from "../../utils/functions/doRegister";
import "./Login.css";

let showLogin = true;

export const Login = () => {
  const div = createPage("login");
  const form = document.createElement("form");

  const toggleButton = Button({
    text: "Don't have an account? Sign Up",
    fnc: () => {
      showLogin = !showLogin;

      form.innerHTML = "";

      if (showLogin) {
        LoginForm(form);
        toggleButton.textContent = "Don't have an account? Sign Up";
        setFormSubmitEvent(doLogin);
      } else {
        RegisterForm(form);
        toggleButton.textContent = "Already have an account? Log in";
        setFormSubmitEvent(doRegister);
      }
    },
    className: "button-toggle",
  });

  const setFormSubmitEvent = (submitFunction) => {
    form.onsubmit = (event) => {
      event.preventDefault();
      submitFunction(event);
    };
  };

  LoginForm(form);
  setFormSubmitEvent(doLogin);

  div.append(toggleButton);
  div.append(form);
};
