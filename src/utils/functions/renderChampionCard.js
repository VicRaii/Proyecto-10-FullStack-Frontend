import { EditChampion } from '../../components/EditChampion/EditChampion'

export const renderChampionCard = (champion, addToFavourites, isFavourite) => {
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
      const editForm = EditChampion(champion, position)
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

  return championDiv
}
