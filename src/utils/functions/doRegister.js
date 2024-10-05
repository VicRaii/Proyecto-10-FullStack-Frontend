import { API } from "../API/API";

export const doRegister = async (e) => {
  e.preventDefault();

  const [userNameInput, emailInput, passwordInput] = e.target;

  const body = {
    userName: userNameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  const res = await API({
    endpoint: "/users/register",
    body,
    method: "POST",
  });

  console.log(res);
};
