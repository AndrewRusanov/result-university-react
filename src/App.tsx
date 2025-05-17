import './App.css'
import UseFetchDemo from './components/UseFetchDemo/UseFetchDemo'
import UseHoverDemo from './components/UseHoverDemo/UseHoverDemo'
import UseLocalStorageDemo from './components/UseLocalStorageDemo/UseLocalStorageDemo'
import UseToggleDemo from './components/UseToggleDemo/UseToggleDemo'
import UseViewportSizeDemo from './components/UseViewportSizeDemo/UseViewportSizeDemo'

function App() {
  return (
    <div className='content'>
      <UseFetchDemo />
      <UseLocalStorageDemo />
      <UseHoverDemo />
      <UseViewportSizeDemo />
      <UseToggleDemo />
    </div>
  )
}

export default App
