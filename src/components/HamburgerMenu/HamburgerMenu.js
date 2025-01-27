import { navigate } from '../../utils/functions/navigate'
import { routes } from '../../utils/routes/routes'
import { Logout } from '../Logout/Logout' // Importar la función Logout
import './HamburgerMenu.css'

export const HamburgerMenu = () => {
  const nav = document.createElement('nav')
  const ul = document.createElement('ul')

  const hamburgerButton = document.createElement('button')
  hamburgerButton.classList.add('hamburger-button')

  const bar1 = document.createElement('div')
  bar1.classList.add('bar', 'bar1')
  const bar2 = document.createElement('div')
  bar2.classList.add('bar', 'bar2')
  const bar3 = document.createElement('div')
  bar3.classList.add('bar', 'bar3')

  hamburgerButton.append(bar1, bar2, bar3)

  hamburgerButton.addEventListener('click', () => {
    ul.classList.toggle('open')
    hamburgerButton.classList.toggle('active')
  })

  const renderMenuItems = () => {
    ul.innerHTML = '' // Limpiar el menú antes de renderizarlo

    const token = localStorage.getItem('token')

    routes.forEach((route) => {
      // Mostrar rutas que requieren autenticación solo si hay token
      if (route.requiresAuth && !token) {
        return
      }

      // Ocultar rutas si el usuario ya está autenticado
      if (route.hideWhenAuth && token) {
        return
      }

      const li = document.createElement('li')
      const a = document.createElement('a')
      a.textContent = route.text
      a.href = route.path

      // Añadir eventos según el tipo de ruta
      if (route.text === 'Logout') {
        a.addEventListener('click', (e) => {
          e.preventDefault()
          Logout() // Llamar a la función Logout
        })
      } else {
        a.addEventListener('click', (e) => navigate(e, route))
      }

      li.appendChild(a)
      ul.appendChild(li)
    })
  }

  renderMenuItems()

  window.addEventListener('tokenChange', () => {
    renderMenuItems()
  })

  nav.append(hamburgerButton, ul)
  return nav
}
