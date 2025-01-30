import { API } from '../../utils/API/API'
import { createPage } from '../../utils/functions/createPage'
import { Notification } from '../../components/Notification/Notification'
// import { getChampions, saveChampions } from '../../utils/functions/getChampions'

import './CreateChampion.css'

export const CreateChampion = () => {
  const div = createPage('create-champion')

  const form = document.createElement('form')
  form.className = 'create-champion-form'

  form.innerHTML = `
    <h2>Create New Champion</h2>
    <div class="field-form">
      <label for="name">Name*</label>
      <input type="text" id="name" name="name" required />
    </div>
    <div class="field-form">
      <label for="role">Role*</label>
      <select id="role" name="role" required>
        <option value="fighter">Fighter</option>
        <option value="assassin">Assassin</option>
        <option value="marksman">Marksman</option>
        <option value="tank">Tank</option>
        <option value="mage">Mage</option>
        <option value="support">Support</option>
      </select>
    </div>
    <div class="field-form">
      <label for="img">Image*</label>
      <input type="file" id="img" name="img" accept="image/*" required />
    </div>
    <button type="submit" class="main-button">Create Champion</button>
  `

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const token = localStorage.getItem('token')
    // const userName = localStorage.getItem('userName') // Obtener el nombre de usuario del localStorage

    try {
      const res = await API({
        endpoint: '/champions',
        method: 'POST',
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
          'Champion created successfully!'
        )

        // const champions = getChampions(userName)
        // champions.push(res)
        // saveChampions(userName, champions)

        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
    } catch (error) {
      Notification(
        'https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif',
        'An error occurred while creating the champion. Please try again.'
      )
    }
  })

  div.appendChild(form)
  return div
}
