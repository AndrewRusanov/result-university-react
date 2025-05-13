import { useHover } from "../../hooks/useHover";
import "./UseHoverDemo.css";

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

export default UseHoverDemo;
