import logo from '../images/favicon.png'
import '../styles/Logo.css'

export default function Logo () {
  return (
    <div className='logo-container'>
    <img
      className='logo'
      src={logo}
      alt="Logo" />
    </div>
  )
}