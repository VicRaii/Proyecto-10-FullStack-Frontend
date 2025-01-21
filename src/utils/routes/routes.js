import { Champions } from '../../pages/Champions/Champions'
import { Favourites } from '../../pages/Favs/Favourites'
import { Home } from '../../pages/Home/Home'
import { Login } from '../../pages/Login/Login'
import { Logout } from '../functions/Logout'

export const routes = [
  {
    path: '/',
    text: 'Home',
    page: Home
  },
  {
    path: '/champions',
    text: 'Champions',
    page: Champions
  },
  {
    path: '/favourites',
    text: 'Favourites',
    page: Favourites,
    requiresAuth: true // Mostrar solo si el usuario está autenticado
  },
  {
    path: '/login',
    text: 'Sign Up / Login',
    page: Login,
    hideWhenAuth: true // Ocultar si el usuario está autenticado
  },
  {
    path: '/logout',
    text: 'Logout',
    page: Logout,
    requiresAuth: true // Mostrar solo si el usuario está autenticado
  }
]
