import { renderChampionCard } from './renderChampionCard'
import { API } from '../../utils/API/API'

export const renderChampionList = async (container) => {
  const token = localStorage.getItem('token')
  const champions = await API({
    endpoint: '/champions',
    method: 'GET',
    token
  })

  container.innerHTML = ''
  champions.forEach((champion) => {
    const championCard = renderChampionCard(
      champion,
      addToFavourites,
      isFavourite,
      container
    )
    container.appendChild(championCard)
  })
}
