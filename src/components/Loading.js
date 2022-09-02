import Logo from '../asset/loading.gif'
import './Loading.css'
export default function Loading() {
  return (
    <div className='loading-container'>
        <img src={Logo} alt="Loading" />
    </div>
  )
}
