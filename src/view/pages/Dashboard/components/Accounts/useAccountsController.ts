import { useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";

export function useAccountsController() {
  const windowWidth = useWindowWidth();

  const [sliderState, setsliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  return {
    sliderState,
    setsliderState,
    windowWidth,
  };
}
