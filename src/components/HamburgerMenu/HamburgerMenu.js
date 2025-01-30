import { Logout } from '../../utils/functions/Logout'
import { navigate } from '../../utils/functions/navigate'
import { routes } from '../../utils/routes/routes'
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
    ul.innerHTML = ''

    const token = localStorage.getItem('token')

    routes.forEach((route) => {
      if (route.requiresAuth && !token) {
        return
      }

      if (route.hideWhenAuth && token) {
        return
      }

      const li = document.createElement('li')
      const a = document.createElement('a')
      a.textContent = route.text
      a.href = route.path

      if (route.text === 'Logout') {
        a.addEventListener('click', (e) => {
          e.preventDefault()
          Logout()
          ul.classList.remove('open')
          hamburgerButton.classList.remove('active')
        })
      } else {
        a.addEventListener('click', (e) => {
          navigate(e, route)
          ul.classList.remove('open')
          hamburgerButton.classList.remove('active')
        })
      }

      li.appendChild(a)
      ul.appendChild(li)
    })
  }

  renderMenuItems()

  window.addEventListener('tokenChange', () => {
    renderMenuItems()
  })

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && ul.classList.contains('open')) {
      ul.classList.remove('open')
      hamburgerButton.classList.remove('active')
    }
  })

  nav.append(hamburgerButton, ul)
  return nav
}
