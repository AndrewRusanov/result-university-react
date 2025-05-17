import './App.css'
import UseFetchDemo from './components/UseFetchDemo/UseFetchDemo'
import UseHoverDemo from './components/UseHoverDemo/UseHoverDemo'
import UseLocalStorageDemo from './components/UseLocalStorageDemo/UseLocalStorageDemo'
import UseViewportSizeDemo from './components/UseViewportSizeDemo/UseViewportSizeDemo'

function App() {
  return (
    <div className='content'>
      <UseFetchDemo />
      <UseLocalStorageDemo />
      <UseHoverDemo />
      <UseViewportSizeDemo />
    </div>
  )
}

export default App
