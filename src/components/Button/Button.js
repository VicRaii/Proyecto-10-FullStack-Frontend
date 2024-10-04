import "./Button.css";

export const Button = ({ text, fnc }) => {
  const button = document.createElement("button");
  button.classList.add("main-button");
  button.textContent = text;
  button.addEventListener("click", fnc);
  return button;
};
