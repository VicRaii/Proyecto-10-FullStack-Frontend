import { Notification } from '../../components/Notification/Notification'
import { Login } from '../../pages/Login/Login'
import { createPage } from './createPage'

export const Logout = () => {
  console.log('Iniciando Logout...')
  Notification(
    'https://media.tenor.com/msScTSOe1lQAAAAj/braum-league.gif',
    'See You Soon!'
  )
  console.log('Notificación enviada.')

  const div = createPage('logout')

  div.innerHTML = ''

  const doLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('profilePicture')

    Notification(
      'https://media.tenor.com/msScTSOe1lQAAAAj/braum-league.gif',
      'See You Soon!'
    )

    document.addEventListener('DOMContentLoaded', () => {
      Notification(
        'https://media.tenor.com/msScTSOe1lQAAAAj/braum-league.gif',
        'See You Soon!'
      )
    })

    setTimeout(() => {
      const main = document.querySelector('main')
      if (main) {
        main.innerHTML = ''
        Login()
        window.history.pushState({}, '', '/login')
      }
    }, 4000) // Aumentar tiempo para asegurar que la notificación se muestre
  }

  doLogout()

  return div
}

//! REVISAR MAS ANTES D EENTREGAR PORQUE NO SE MUESTRA LA NOTIFICACIÓN CUANDO SE HACE LOGOUT
