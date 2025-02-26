import { useSwiper } from "swiper/react";
import { cn } from "../../../../../app/utils/cn";

interface SlideOptionProps {
  isActive: boolean;
  month: string;
  index: number;
}

export function SliderOption({ isActive, month, index }: SlideOptionProps) {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slideTo(index)}
      className={cn(
        'w-full rounded-full h-12 text-sm text-gray-80 tracking-[-0.5px] font-medium',
        isActive && 'bg-white'
      )}
    >
      {month}
    </button>
  );
}
