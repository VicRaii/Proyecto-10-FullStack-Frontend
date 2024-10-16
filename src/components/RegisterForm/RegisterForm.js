import { Button } from "../Button/Button";
import { FieldForm } from "../FieldForm/FieldForm";
import "./RegisterForm.css";

export const RegisterForm = (form) => {
  form.className = "register-form";

  form.innerHTML = `
          ${FieldForm({ labelText: "Username*" })}   
          ${FieldForm({ labelText: "Email*", type: "email" })}   
          ${FieldForm({ labelText: "Password*", type: "password" })}   
          ${FieldForm({
            labelText: "Repeat your password*",
            type: "password",
          })}   
      `;
  form.append(Button({ text: "Sign Up" }));
};
