import { API } from '../../utils/API/API'
import { Notification } from '../../components/Notification/Notification'

import './DeleteChampion.css'

export const DeleteChampion = (champion, position, container) => {
  const div = document.createElement('div')
  div.id = 'container'
  div.style.position = 'absolute'
  div.style.top = `${position.top}px`
  div.style.left = `${position.left}px`

  const modal = document.createElement('div')
  modal.className = 'container-inner'

  modal.innerHTML = `
    <div class="content">
      <p>Do you want to Continue?</p>
    </div>
    <div class="buttons">
      <button type="button" class="confirm">Confirm</button>
      <button type="button" class="cancel">Cancel</button>
    </div>
  `

  const confirmButton = modal.querySelector('.confirm')
  const cancelButton = modal.querySelector('.cancel')

  confirmButton.addEventListener('click', async () => {
    const token = localStorage.getItem('token')

    try {
      const res = await API({
        endpoint: `/champions/${champion._id}`,
        method: 'DELETE',
        token
      })

      if (res.message) {
        Notification(
          'https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif',
          res.message
        )
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        Notification(
          'https://media.tenor.com/dUCnsmkTiD8AAAAj/league-of-legends.gif',
          'Champion deleted successfully!'
        )
      }
    } catch (error) {
      Notification(
        'https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif',
        'An error occurred while deleting the champion. Please try again.'
      )
    }
  })

  cancelButton.addEventListener('click', () => {
    div.remove()
  })

  div.appendChild(modal)
  return div
}
