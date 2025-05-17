import './App.css'
import UseFetchDemo from './components/UseFetchDemo/UseFetchDemo'
import UseHoverDemo from './components/UseHoverDemo/UseHoverDemo'
import UseLocalStorageDemo from './components/UseLocalStorageDemo/UseLocalStorageDemo'
import UseViewportSizeDemo from './components/UseViewportSizeDemo/UseViewportSizeDemo'
import UseWindowScrollDemo from './components/UseWindowScrollDemo/UseWindowScrollDemo'

function App() {
  return (
    <div className='content'>
      <UseFetchDemo />
      <UseLocalStorageDemo />
      <UseHoverDemo />
      <UseViewportSizeDemo />
      <UseWindowScrollDemo />
    </div>
  )
}

export default App
