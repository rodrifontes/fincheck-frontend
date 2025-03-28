import { useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const {
    areValuesVisible,
    toggleValuesVisibility,
    openNewAccountModal
  } = useDashboard();

  const [sliderState, setsliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  return {
    sliderState,
    setsliderState,
    windowWidth,
    toggleValuesVisibility,
    areValuesVisible,
    isLoading: false,
    accounts: [],
    openNewAccountModal
  };
}
