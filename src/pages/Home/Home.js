import { createPage } from "../../utils/functions/createPage";
import "./Home.css";

export const Home = () => {
  const div = createPage("home");
  div.innerHTML = `<h1>Home</h1>`;
};
