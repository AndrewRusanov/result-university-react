import './App.css'
import UseFetchDemo from './components/UseFetchDemo/UseFetchDemo'
import UseHoverDemo from './components/UseHoverDemo/UseHoverDemo'
import UseLocalStorageDemo from './components/UseLocalStorageDemo/UseLocalStorageDemo'
import UseToggleDemo from './components/UseToggleDemo/UseToggleDemo'
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
      <UseToggleDemo />
    </div>
  )
}

export default App
