import "./Notification.css";

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

  setTimeout(() => {
    notificationDiv.remove();
  }, 3000);

  return notificationDiv;
};
