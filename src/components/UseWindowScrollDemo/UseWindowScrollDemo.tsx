import { useWindowScroll } from '../../hooks/useWindowScroll'
import './UseWindowScrollDemo.css'

const UseWindowScrollDemo = () => {
  const [scroll, scrollTo] = useWindowScroll()
  return (
    <div className='UseWindowScrollDemo_container'>
      <h3 className='container_title'>UseWindowScrollDemo</h3>
      <div>
        <p>
          Scroll position x: {scroll.x}, y: {scroll.y}
        </p>
        <button onClick={() => scrollTo({ y: 0 })}>Scroll to top</button>
      </div>
    </div>
  )
}

export default UseWindowScrollDemo
