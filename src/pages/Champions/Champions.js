import { Loading } from '../../components/Loading/Loading'
import { API } from '../../utils/API/API'
import { createPage } from '../../utils/functions/createPage'
import { Pagination } from '../../components/Pagination/Pagination'
import { renderChampionCard } from '../../utils/functions/renderChampionCard'
import { ChampionFilters } from '../../components/ChampionFilters/ChampionFilters'
import {
  addToFavourites,
  getFavourites
} from '../../utils/functions/addToFavourites'
import { navigate } from '../../utils/functions/navigate'
import { routes } from '../../utils/routes/routes'

import './Champions.css'
import '../Champions/ChampionsPosition.css'
let cachedChampions = null

export const Champions = async () => {
  const div = createPage('champions')
  const token = localStorage.getItem('token')

  if (!token) {
    div.innerHTML = ''
    const loginContainer = document.createElement('div')
    const h3 = document.createElement('h3')
    const link = document.createElement('a')

    loginContainer.classList.add('login-container')
    link.textContent = 'Sign Up/Login'
    link.href = '#'
    h3.textContent = 'to be able to see all the Champions.'

    link.addEventListener('click', (e) => {
      const loginRoute = routes.find((route) => route.path === '/login')
      if (loginRoute) {
        navigate(e, loginRoute)
      }
    })

    loginContainer.append(link, h3)
    div.appendChild(loginContainer)
    return
  }

  const loadingComponent = Loading()
  div.appendChild(loadingComponent)

  try {
    if (!cachedChampions) {
      const championsResponse = await API({
        endpoint: '/champions',
        token
      })
      cachedChampions = championsResponse.sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    }

    const orderedChampions = cachedChampions
    const pageSize = 15
    let currentPage = 1
    let filteredChampions = orderedChampions

    const totalPages = () => Math.ceil(filteredChampions.length / pageSize)

    const applyFilters = ({ name, role }) => {
      filteredChampions = orderedChampions.filter((champion) => {
        const matchesName = champion.name.toLowerCase().includes(name)
        const matchesRole = !role || champion.role.includes(role)
        return matchesName && matchesRole
      })

      currentPage = 1
      renderPage(currentPage)
    }

    const filtersComponent = ChampionFilters({ onFilterChange: applyFilters })
    div.appendChild(filtersComponent)

    const renderPage = (page) => {
      const start = (page - 1) * pageSize
      const end = start + pageSize
      const championsToShow = filteredChampions.slice(start, end)

      const championsContainer = document.createElement('div')
      championsContainer.classList.add('champions-container')

      championsToShow.forEach((champion) => {
        const isFavourite = getFavourites().some(
          (fav) => fav.name === champion.name
        )
        championsContainer.appendChild(
          renderChampionCard(champion, addToFavourites, isFavourite)
        )
      })

      const paginationComponent = Pagination({
        currentPage,
        totalPages: totalPages(),
        onPageChange: (newPage) => {
          currentPage = newPage
          renderPage(currentPage)
        }
      })

      const existingChampionsContainer = div.querySelector(
        '.champions-container'
      )
      if (existingChampionsContainer) {
        div.removeChild(existingChampionsContainer)
      }

      div.appendChild(championsContainer)
      div.appendChild(paginationComponent)
    }

    renderPage(currentPage)
  } catch (error) {
    div.innerHTML = `
      <p id="errorMessage" style="
       
      ">
        ⚠️ User unknown. <br />
        Try to log in again.
      </p>
    `
  } finally {
    loadingComponent.style.display = 'none'
  }
}
