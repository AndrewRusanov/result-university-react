import { useLocalStorage } from "../../hooks/useLocalStorage";
import "./UseLocalStorageDemo.css";

const UseLocalStorageDemo = () => {
  const [value, { setItem, removeItem }] = useLocalStorage("some-key");

  return (
    <div className="UseLocalStorageDemo_container">
      <h2 className="container_title">UseLocalStorageDemo</h2>
      <div className="container_content">
        <p>Значение из LocalStorage: {value}</p>
        <div className="container_btns">
          <button onClick={() => setItem("new storage value")} className="btn">
            Задать значение
          </button>
          <button onClick={() => removeItem()} className="btn">
            Удалить значение
          </button>
        </div>
      </div>
    </div>
  );
};

export default UseLocalStorageDemo;
