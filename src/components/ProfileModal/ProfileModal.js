import { Button } from '../Button/Button'
import { API } from '../../utils/API/API'
import { Notification } from '../Notification/Notification'
import './ProfileModal.css'

export const ProfileModal = (userName, email, profilePicture) => {
  const modal = document.createElement('div')
  modal.className = 'profile-modal'

  const modalContent = document.createElement('div')
  modalContent.className = 'profile-modal-content'

  modalContent.innerHTML = `
    <h2>Edit Profile</h2>
    <div class="field-form">
      <label for="userName">Username*</label>
      <input type="text" id="userName" name="userName" >
    </div>
    <div class="field-form">
      <label for="email">Email*</label>
      <input type="email" id="email" name="email" >
    </div>
    <div class="field-form">
      <label for="profilePicture">Profile Picture</label>
      <input type="file" id="profilePicture" name="profilePicture" accept="image/*">
    </div>
  `

  const saveButton = Button({
    text: 'Save Changes',
    fnc: async (e) => {
      e.preventDefault()
      const [userNameInput, emailInput, profilePictureInput] =
        modalContent.querySelectorAll('input')
      const formData = new FormData()
      formData.append('userName', userNameInput.value)
      formData.append('email', emailInput.value)
      if (profilePictureInput.files[0]) {
        formData.append('profilePicture', profilePictureInput.files[0])
      }

      try {
        const res = await API({
          endpoint: '/users/update',
          method: 'PUT',
          body: formData,
          isJSON: false,
          token: localStorage.getItem('token')
        })

        if (res.message) {
          Notification(
            'https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif',
            res.message
          )
        } else {
          Notification(
            'https://media.tenor.com/dUCnsmkTiD8AAAAj/league-of-legends.gif',
            'Profile updated successfully!'
          )
          localStorage.setItem('userName', res.userName)
          localStorage.setItem('profilePicture', res.profilePicture)
          window.dispatchEvent(new Event('tokenChange'))
          closeModal()
        }
      } catch (error) {
        Notification(
          'https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif',
          'An error occurred while updating your profile. Please try again.'
        )
      }
    }
  })

  const closeButton = document.createElement('button')
  closeButton.className = 'close-button'
  closeButton.innerHTML = '&times;'
  closeButton.addEventListener('click', () => {
    closeModal()
  })

  const closeModal = () => {
    modalContent.style.animation = 'scaleOut 0.3s forwards'
    modal.style.animation = 'fadeOut 0.3s forwards'
    setTimeout(() => {
      modal.remove()
    }, 300)
  }

  modalContent.append(saveButton)
  modalContent.appendChild(closeButton) // Asegúrate de que el botón de cierre esté dentro del modalContent
  modal.appendChild(modalContent)
  document.body.appendChild(modal)

  //! AHORA HAN DESAPARECIDO LOS MENSAJES DE NOTIFICACIÓN
}
