import { API } from "../API/API";
import { Notification } from "../../components/Notification/Notification";
import { Champions } from "../../pages/Champions/Champions";

export const doLogin = async (e) => {
  e.preventDefault();

  const currentToken = localStorage.getItem("token");

  const [userNameInput, passwordInput] = e.target;

  const body = {
    userName: userNameInput.value,
    password: passwordInput.value,
  };

  const res = await API({
    endpoint: "/users/login",
    body,
    method: "POST",
  });

  if (res.token) {
    const previousUser = localStorage.getItem("userName");
    if (currentToken && previousUser !== res.user.userName) {
      Notification(
        "https://media.tenor.com/dUCnsmkTiD8AAAAj/league-of-legends.gif",
        "Closing previous session..."
      );

      localStorage.removeItem("token");
      localStorage.removeItem("userName");

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    localStorage.setItem("token", res.token);
    localStorage.setItem("userName", res.user.userName);

    console.log("Login successful:", res);

    const tokenChangeEvent = new Event("tokenChange");
    window.dispatchEvent(tokenChangeEvent);

    Notification(
      "https://media.tenor.com/dUCnsmkTiD8AAAAj/league-of-legends.gif",
      "Login successful!"
    );

    setTimeout(() => {
      const main = document.querySelector("main");
      main.innerHTML = "";
      Champions();
      window.history.pushState({}, "", "/champions");
    }, 1000);
  } else if (res.message === "User or password incorrect") {
    Notification(
      "https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif",
      "User or Password incorrect"
    );
    console.log("Login failed:", res);
  } else {
    Notification(
      "https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif",
      "Login failed!"
    );
    console.log("Login failed:", res);
  }
};
