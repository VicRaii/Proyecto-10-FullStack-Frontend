import { Notification } from '../Notification/Notification'
import { createPage } from '../../utils/functions/createPage'
import './Logout.css'

export const Logout = () => {
  const div = createPage('logout')
  div.innerHTML = `
    <h1>
      GG Well Played
    </h1>
  `

  localStorage.removeItem('token')
  localStorage.removeItem('userName')
  localStorage.removeItem('profilePicture')

  Notification(
    'https://media.tenor.com/msScTSOe1lQAAAAj/braum-league.gif',
    'See You Soon!'
  )

  setTimeout(() => {
    window.location.reload()
  }, 3000)

  return div
}
