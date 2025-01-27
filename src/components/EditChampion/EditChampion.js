import { API } from '../../utils/API/API'
import { Notification } from '../../components/Notification/Notification'
import './EditChampion.css'

export const EditChampion = (champion, position) => {
  const div = document.createElement('div')
  div.className = 'edit-champion'
  div.style.top = `${position.top}px`
  div.style.left = `${position.left}px`

  const form = document.createElement('form')
  form.className = 'edit-champion-form'

  form.innerHTML = `
    <h2>Edit Champion</h2>
    <div class="field-form">
      <label for="name">Name*</label>
      <input type="text" id="name" name="name" value="${
        champion.name
      }" required />
    </div>
    <div class="field-form">
      <label for="role">Role*</label>
      <select id="role" name="role" required>
        <option value="fighter" ${
          champion.role === 'fighter' ? 'selected' : ''
        }>Fighter</option>
        <option value="assassin" ${
          champion.role === 'assassin' ? 'selected' : ''
        }>Assassin</option>
        <option value="marksman" ${
          champion.role === 'marksman' ? 'selected' : ''
        }>Marksman</option>
        <option value="tank" ${
          champion.role === 'tank' ? 'selected' : ''
        }>Tank</option>
        <option value="mage" ${
          champion.role === 'mage' ? 'selected' : ''
        }>Mage</option>
        <option value="support" ${
          champion.role === 'support' ? 'selected' : ''
        }>Support</option>
      </select>
    </div>
    <div class="field-form">
      <label for="img">Image*</label>
      <input type="file" id="img" name="img" accept="image/*" />
    </div>
    <button type="submit" class="main-button">Save Changes</button>
    <button type="button" class="close-button">X</button>
  `

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const token = localStorage.getItem('token')

    try {
      const res = await API({
        endpoint: `/champions/${champion._id}`,
        method: 'PUT',
        body: formData,
        isJSON: false,
        token
      })

      if (res.message) {
        Notification(
          'https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif',
          res.message
        )
      } else {
        Notification(
          'https://media.tenor.com/dUCnsmkTiD8AAAAj/league-of-legends.gif',
          'Champion updated successfully!'
        )
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
    } catch (error) {
      Notification(
        'https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif',
        'An error occurred while updating the champion. Please try again.'
      )
    }
  })

  const closeButton = form.querySelector('.close-button')
  closeButton.addEventListener('click', () => {
    div.remove()
  })

  div.appendChild(form)
  return div
}
