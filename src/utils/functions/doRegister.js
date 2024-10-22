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
    const res = await API({
      endpoint: "/users/register",
      body,
      method: "POST",
    });

    if (res.message) {
      throw new Error(res.message);
    }

    if (res._id) {
      console.log("Sign up successful:", res);

      Notification(
        "https://media.tenor.com/dUCnsmkTiD8AAAAj/league-of-legends.gif",
        "Welcome! Sign up successful!"
      );

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
      if (loginRes.token) {
        localStorage.setItem("token", loginRes.token);

        const tokenChangeEvent = new Event("tokenChange");
        window.dispatchEvent(tokenChangeEvent);

        setTimeout(() => {
          const main = document.querySelector("main");
          main.innerHTML = "";
          Champions();
          window.history.pushState({}, "", "/champions");
        }, 1000);
      } else {
        throw new Error("Login failed after registration");
      }
    } else {
      throw new Error("Sign up failed! Unknown error.");
    }
  } catch (error) {
    Notification(
      "https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif",
      `Sign up or login failed: ${error.message}`
    );
    console.error("Sign up or login failed:", error);
  }
};
