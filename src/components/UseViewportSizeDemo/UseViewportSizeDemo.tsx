import { useViewportSize } from '../../hooks/useViewportSize'
import './UseViewportSizeDemo.css'

const UseViewportSizeDemo = () => {
  const { width, height } = useViewportSize()

  return (
    <div className='UseLocalStorageDemo_container'>
      <h1 className='container_title'>UseViewportSizeDemo</h1>
      <div className='container_content'>
        <span>Ширина экрана: {width}</span>
        <span>Высота экрана: {height}</span>
      </div>
    </div>
  )
}

export default UseViewportSizeDemo
