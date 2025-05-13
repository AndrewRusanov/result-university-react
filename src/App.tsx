import './App.css'
import UseFetchDemo from './components/UseFetchDemo/UseFetchDemo'
import UseHoverDemo from './components/UseHoverDemo/UseHoverDemo'
import UseLocalStorageDemo from './components/UseLocalStorageDemo/UseLocalStorageDemo'

function App() {
  return (
    <div className='content'>
      <UseFetchDemo />
      <UseLocalStorageDemo />
      <UseHoverDemo />
    </div>
  )
}

export default App
