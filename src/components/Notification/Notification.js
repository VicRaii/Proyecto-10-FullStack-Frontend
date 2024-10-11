import "./Notification.css";
// Notification.js

export const Notification = (gifUrl, message) => {
  const notificationDiv = document.createElement("div");
  notificationDiv.className = "notification";

  notificationDiv.innerHTML = `
      <div class="notification-content">
        <img src="${gifUrl}" alt="Success GIF" />
        <p>${message}</p>
      </div>
    `;

  document.body.appendChild(notificationDiv);

  // Ocultar la notificación después de 5 segundos
  setTimeout(() => {
    notificationDiv.remove();
  }, 3000);

  return notificationDiv;
};
