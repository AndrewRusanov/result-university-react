import { useToggle } from '../../hooks/useToggle'

const UseToggleDemo = () => {
  const [value, toggle] = useToggle()
  const [color, toggleColor] = useToggle(['green', 'blue', 'red', 'black'])

  return (
    <div className='UseToggleDemo_container'>
      <h2 className='container_title'>UseToggleDemo</h2>
      <div className='container_content'>
        <button onClick={() => toggle()}>Value: {value.toString()}</button>
      </div>
      <div className='container_content'>
        <button onClick={() => toggleColor()}>Цвет: {color}</button>
        <button onClick={() => toggleColor('black')}>
          Установить чёрный цвет
        </button>
      </div>
    </div>
  )
}

export default UseToggleDemo
