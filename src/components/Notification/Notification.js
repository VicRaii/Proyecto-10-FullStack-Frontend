import '../../components/Notification/Notification.css'

export const Notification = (imageUrl, message) => {
  const notification = document.createElement('div')
  notification.className = 'notification'

  const img = document.createElement('img')
  img.src = imageUrl
  img.alt = 'Notification Image'

  const text = document.createElement('p')
  text.textContent = message

  notification.appendChild(img)
  notification.appendChild(text)

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 3000)
}
