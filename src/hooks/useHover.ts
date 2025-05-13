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
