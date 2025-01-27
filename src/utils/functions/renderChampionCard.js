import { EditChampion } from '../../components/EditChampion/EditChampion'
import { DeleteChampion } from '../../components/DeleteChampion/DeleteChampion'

export const renderChampionCard = (
  champion,
  addToFavourites,
  isFavourite,
  container
) => {
  const championDiv = document.createElement('div')
  championDiv.className = 'championsGrid'

  championDiv.innerHTML = `
    <div class="card-img">
      <img id="${champion.name
        .trim()
        .replace("'", '-')
        .replace(' ', '-')
        .replace('.', '-')
        .replace('&', '-')}" src="${champion.img}" 
        alt="${champion.name} image not found"/>
      <span class="edit-icon">&#9998;</span> <!-- Ícono de edición (lápiz) -->
      <span class="delete-icon">&#10060;</span> <!-- Ícono de borrar (cruz) -->
    </div>
    <div class="card-footer">
      <h3>${champion.name}</h3>
      <div class="likeIcon">
        <img src="${
          isFavourite ? '/assets/heartFilledIcon.png' : '/assets/heartIcon.png'
        }" alt="like" />
      </div>
      <h4>#${champion.role}</h4>
    </div>
  `

  const favouriteIcon = championDiv.querySelector('.likeIcon img')
  const editIcon = championDiv.querySelector('.edit-icon')
  const deleteIcon = championDiv.querySelector('.delete-icon')

  if (favouriteIcon) {
    favouriteIcon.onclick = () => addToFavourites(champion, favouriteIcon)
  } else {
    console.error('Favourite icon not found for champion:', champion.name)
  }

  if (editIcon) {
    editIcon.onclick = () => {
      const existingForm = document.querySelector('.edit-champion')
      if (existingForm) {
        existingForm.remove()
      }
      championDiv.classList.add('editing') // Agregar clase para ocultar el botón de editar
      const rect = championDiv.getBoundingClientRect()
      const position = {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX
      }
      const editForm = EditChampion(champion, position, container)
      document.body.appendChild(editForm)

      // Agregar evento para eliminar la clase cuando se cierre el formulario
      const closeButton = editForm.querySelector('.close-button')
      closeButton.addEventListener('click', () => {
        championDiv.classList.remove('editing')
      })
    }
  } else {
    console.error('Edit icon not found for champion:', champion.name)
  }

  if (deleteIcon) {
    deleteIcon.onclick = () => {
      const existingModal = document.querySelector('.delete-champion')
      if (existingModal) {
        existingModal.remove()
      }
      const rect = championDiv.getBoundingClientRect()
      const position = {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX
      }
      const deleteModal = DeleteChampion(champion, position, container)
      document.body.appendChild(deleteModal)
    }
  } else {
    console.error('Delete icon not found for champion:', champion.name)
  }

  return championDiv
}
