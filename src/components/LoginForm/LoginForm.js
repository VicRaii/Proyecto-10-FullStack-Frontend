import { Button } from "../Button/Button";
import { FieldForm } from "../FieldForm/FieldForm";
import "./LoginForm.css";

export const LoginForm = (form) => {
  form.className = "login-form";

  form.innerHTML = `
        ${FieldForm({ labelText: "Username" })}   
        ${FieldForm({ labelText: "Password", type: "password" })}   
    `;
  form.append(Button({ text: "Login", fnc: () => {} }));
};
