import { HamburgerMenu } from '../../components/HamburgerMenu/HamburgerMenu' // Importamos el componente de menú hamburguesa
import './Header.css'

export const Header = () => {
  const header = document.createElement('header')

  const hamburgerMenu = HamburgerMenu()
  header.append(hamburgerMenu)

  document.body.append(header)
}
