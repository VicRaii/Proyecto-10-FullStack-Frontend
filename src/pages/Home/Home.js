import { createPage } from '../../utils/functions/createPage'
import { routes } from '../../utils/routes/routes'
import { navigate } from '../../utils/functions/navigate'

import './Home.css'

export const Home = () => {
  const div = createPage('home')
  div.innerHTML = `
    <div class="home-header">
        <video muted autoplay loop >
          <source src="/assets/videoHome.webm" type="video/webm">
        </video>
      <div class="capa"></div>
    </div>
  `

  const loginContainer = document.createElement('div')
  const img = document.createElement('img')
  const h3 = document.createElement('h3')
  const link = document.createElement('a')

  img.src = '/assets/LoLtitle.webp'
  img.alt = 'League of Legends Title'
  img.classList.add('home-image1')
  loginContainer.classList.add('login-container')
  link.textContent = 'Sign Up/Login'
  link.href = '#'
  h3.textContent = 'to see all the Champions.'

  link.addEventListener('click', (e) => {
    const loginRoute = routes.find((route) => route.path === '/login')
    if (loginRoute) {
      navigate(e, loginRoute)
    }
  })

  loginContainer.append(img, link, h3)
  div.appendChild(loginContainer)

  const updateLoginContainer = () => {
    const token = localStorage.getItem('token')
    const userName = localStorage.getItem('userName')
    const profilePicture = localStorage.getItem('profilePicture')
    if (token && profilePicture) {
      loginContainer.innerHTML = `
        <img src="${profilePicture}" alt="Profile Picture" class="home-image2">
        <div class="welcome-container">
          <h3>Welcome Summoner ${userName}</h3>
        </div>
      `
    } else {
      loginContainer.innerHTML = ''
      loginContainer.append(img, link, h3)
    }
  }

  window.addEventListener('tokenChange', updateLoginContainer)
  updateLoginContainer()
}
