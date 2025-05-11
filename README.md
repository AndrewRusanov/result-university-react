# Задание №2

## Постановка задачи
 Реализуйте хук `useLocalStorage()`, который можно будет использовать следующим образом:

 ```jsx
import { useLocalStorage } from './useLocalStorage';

function Demo() {
  const [value, { setItem, removeItem }] = useLocalStorage('some-key');

  return (
    <div>
      <p>Значение из LocalStorage: {value}</p>
      <div>
        <button onClick={() => setItem('new storage value')}>Задать значение</button>
        <button onClick={() => removeItem()}>Удалить значение</button>
      </div>
    </div>
  );
}
 ```

 Кроме того, необходимо добавить типизацию хука:

```typescript
type LocalStorageSetValue = string;
type LocalStorageReturnValue = LocalStorageSetValue | null;

type UseLocalStorage = (key: string) => [
  value: LocalStorageReturnValue,
  {
    setItem: (value: LocalStorageSetValue) => void;
    removeItem: () => void;
  },
];
```
Здесь мы учитываем, что в `LocalStorage` значения всегда хранятся в виде строк. Однако в случае, если значение по ключу `key` не найдено, то вернется `null`. 

 ## Решение
В качестве входного параметра принимает ключ `key`, по которому находит и изменяет данные в `localStorage`.
В качестве выходных параметров хук возвращает:
- `value` - значение из `localStorage`, а если его нет, то `null`;
- `setItem` - Функцию, которая добавляет новый элемент в `localStorage`;
- `removeItem` - Функцию, которая очищает в `localStorage` элемент `key`.

 ```tsx
function getValueStorage(key: string): LocalStorageReturnValue {
  const savedValue = localStorage.getItem(key);
  if (!savedValue) {
    return null;
  }

  return savedValue;
}

const useLocalStorage: UseLocalStorage = (key) => {
  const [value, setValue] = useState<LocalStorageReturnValue>(() =>
    getValueStorage(key)
  );

  const setItem = (value: LocalStorageSetValue) => {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  const removeItem = () => {
    localStorage.removeItem(key);
    setValue(null);
  };

  return [value, { setItem, removeItem }];
};

export { useLocalStorage };
 ```

 ## Пример использования

 ```jsx
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
 ```