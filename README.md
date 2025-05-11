# Задание №3

## Постановка задачи
 Реализуйте хук `useHover()`, который можно будет использовать следующим образом:

 ```jsx
Реализуйте хук useHover(), который можно будет использовать следующим образом:

import { useHover } from './useHover';

function Demo() {
  const { hovered, ref } = useHover();

  return (
    <div ref={ref}>
      {hovered ? 'На меня навели мышку' : 'Наведи мышкой на меня'}
    </div>
  );
}
 ```

 ## Решение
В качестве выходных параметров хук возвращает:
- `ref` - ссылку на DOM-элемент;
- `isHovered` - состояние, которое отвечает за наведение на `ref-элемент` курсора мыши.

 ```tsx
import { useEffect, useRef, useState } from "react";

export function useHover() {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mouseenter", handleMouseEnter);
      ref.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      ref.current?.removeEventListener("mouseenter", handleMouseEnter);
      ref.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return { ref, isHovered };
}

 ```

 ## Пример использования

 ```jsx
const UseHoverDemo = () => {
  const { ref, isHovered } = useHover();
  return (
    <div className="UseHoverDemo_container">
      <h2 className="container_title">UseHoverDemo</h2>
      <div ref={ref}>
        {isHovered ? "На меня навели мышку" : "Наведи мышкой на меня"}
      </div>
    </div>
  );
};
 ```