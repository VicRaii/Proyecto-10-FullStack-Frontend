import "./CreateChampion.css";
import { createPage } from "../../utils/functions/createPage";
import { Button } from "../../components/Button/Button";
import { API } from "../../utils/API/API";
import { Notification } from "../../components/Notification/Notification";

export const CreateChampion = () => {
  const div = createPage("create-champion");
  const form = document.createElement("form");
  form.classList.add("create-champion-form");

  const title = document.createElement("h2");
  title.textContent = "Create a New Champion";

  // Name input
  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Champion Name:";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "name";
  nameInput.placeholder = "Enter champion name";
  nameInput.required = true;

  // Role input
  const roleLabel = document.createElement("label");
  roleLabel.textContent = "Champion Role:";
  const roleInput = document.createElement("input");
  roleInput.type = "text";
  roleInput.name = "role";
  roleInput.placeholder = "Enter champion role";
  roleInput.required = true;

  // Image input
  const imageLabel = document.createElement("label");
  imageLabel.textContent = "Champion Image URL:";
  const imageInput = document.createElement("input");
  imageInput.type = "url";
  imageInput.name = "image";
  imageInput.placeholder = "Enter image URL";
  imageInput.required = true;

  // Submit button
  const submitButton = Button({
    text: "Create Champion",
    className: "create-champion-button",
  });

  // Form submit handler
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita el refresco de la página

    console.log({
      name: nameInput.value,
      role: roleInput.value,
      image: imageInput.value,
    });

    const body = {
      name: nameInput.value,
      role: roleInput.value,
      image: imageInput.value,
    };

    try {
      const res = await API({
        endpoint: "/champions",
        method: "POST",
        body,
        token: localStorage.getItem("token"), // Añade el token aquí
      });

      if (res.message) {
        Notification(
          "https://media.tenor.com/dUCnsmkTiD8AAAAj/league-of-legends.gif",
          `Champion created successfully!`
        );

        // Clear the form inputs after success
        form.reset();
      } else {
        throw new Error("Failed to create champion");
      }
    } catch (error) {
      Notification(
        "https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif",
        `Error: ${error.message}`
      );
      console.error("Failed to create champion:", error);
    }
  });

  form.append(
    title,
    nameLabel,
    nameInput,
    roleLabel,
    roleInput,
    imageLabel,
    imageInput,
    submitButton
  );

  div.appendChild(form);
};
