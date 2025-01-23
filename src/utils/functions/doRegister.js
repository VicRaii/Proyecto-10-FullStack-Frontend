import { API } from '../API/API'
import { Notification } from '../../components/Notification/Notification'
import { Champions } from '../../pages/Champions/Champions'

export const doRegister = async (e) => {
  e.preventDefault()

  const [
    userNameInput,
    emailInput,
    passwordInput,
    repeatPasswordInput,
    profilePictureInput
  ] = e.target

  if (
    !userNameInput.value ||
    !emailInput.value ||
    !passwordInput.value ||
    !repeatPasswordInput.value ||
    !profilePictureInput.files[0]
  ) {
    Notification(
      'https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif',
      'All fields are required'
    )
    return
  }

  const formData = new FormData()
  formData.append('userName', userNameInput.value)
  formData.append('email', emailInput.value)
  formData.append('password', passwordInput.value)
  formData.append('repeatPassword', repeatPasswordInput.value)
  formData.append('profilePicture', profilePictureInput.files[0])

  try {
    const res = await API({
      endpoint: '/users/register',
      body: formData,
      method: 'POST',
      isJSON: false
    })

    if (res.message && res.token) {
      Notification(
        'https://media.tenor.com/dUCnsmkTiD8AAAAj/league-of-legends.gif',
        'Welcome! Sign up successful!'
      )

      localStorage.setItem('token', res.token)
      localStorage.setItem('userName', res.user.userName)
      localStorage.setItem('profilePicture', res.user.profilePicture)

      const tokenChangeEvent = new Event('tokenChange')
      window.dispatchEvent(tokenChangeEvent)

      setTimeout(() => {
        const main = document.querySelector('main')
        main.innerHTML = ''
        Champions()
        window.history.pushState({}, '', '/champions')
      }, 1000)
    } else {
      throw new Error(res.message || 'Sign up failed! Unknown error.')
    }
  } catch (error) {
    Notification(
      'https://media.tenor.com/EEB4at6dhLQAAAAj/good-morning.gif',
      `Sign up or login failed: ${error.message}`
    )
    console.error('Sign up or login failed:', error)
  }
}
