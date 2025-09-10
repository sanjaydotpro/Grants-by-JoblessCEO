import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import Lottie from "lottie-react";

interface CustomPopoverProps {
  animationData: any;
  icon: React.ReactNode;
  description: string;
}

const CustomPopover: React.FC<CustomPopoverProps> = ({
  animationData,
  icon,
  description,
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Lottie
          animationData={animationData}
          loop={true}
          style={{ width: 20, height: 20 }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-70">
        <div className="flex items-center text-sm dark:text-white text-black font-bold">
          {icon}
          {description}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CustomPopover;
