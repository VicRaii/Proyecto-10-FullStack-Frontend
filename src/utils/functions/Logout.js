import { Notification } from '../../components/Notification/Notification'
import { createPage } from './createPage'

export const Logout = () => {
  const div = createPage('logout')
  div.innerHTML = ``

  localStorage.removeItem('token')
  localStorage.removeItem('userName')
  localStorage.removeItem('profilePicture')

  Notification(
    'https://media.tenor.com/msScTSOe1lQAAAAj/braum-league.gif',
    'See You Soon!'
  )

  setTimeout(() => {
    window.location.reload()
  }, 2000)

  return div
}
