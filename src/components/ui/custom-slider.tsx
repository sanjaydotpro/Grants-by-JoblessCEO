import useTagOperations from "@/store/slices/tagOperations";
import React, { useCallback } from "react";
import { capitalizeFirstLetter } from "@/lib/helper/miscFunctions";
import { OrganisedTags, SingleTag } from "@/types";
import { InputWithAddons } from "@/components/ui/input-with-addons";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useDebouncedCallback } from "use-debounce";

const CustomSlider = ({
  selectedFilter,
  data,
}: {
  selectedFilter: string;
  data: SingleTag[];
}) => {
  const { activeFilters, handleFilterAdd, handleFilterRemoval } =
    useTagOperations();

  const [minValue, maxValue] = data[0].value.split(",").map(Number);
  const activeFilter = activeFilters[selectedFilter as keyof OrganisedTags];
  const initialSliderValue =
    activeFilter && activeFilter.length > 0
      ? activeFilter[0].value.split(",").map(Number)
      : [minValue, maxValue];

  const [sliderValue, setSliderValue] = React.useState(initialSliderValue);

  const prefix = data[0].prefix;
  const suffix = data[0].suffix;
  const label = capitalizeFirstLetter(selectedFilter);

  const updateFilter = useCallback(
    (newValue: number[]) => {
      if (newValue[0] !== minValue || newValue[1] !== maxValue) {
        handleFilterRemoval({ filter: selectedFilter });
        const newTag = {
          filter: selectedFilter,
          value: `${newValue[0]},${newValue[1]}`,
          label: `${label}: ${prefix}${newValue[0]}-${newValue[1]}${suffix}`,
          id: data[0].id,
          prefix,
          suffix,
        };
        handleFilterAdd(newTag);
      }
    },
    [
      selectedFilter,
      label,
      prefix,
      suffix,
      data,
      handleFilterAdd,
      handleFilterRemoval,
      minValue,
      maxValue,
    ]
  );

  // Create a debounced version of updateFilter
  const debouncedUpdateFilter = useDebouncedCallback((newValue: number[]) => {
    updateFilter(newValue);
  }, 700);

  const handleSliderChange = (newValue: number[]) => {
    setSliderValue(newValue);
    debouncedUpdateFilter(newValue);
  };

  const handleInputChange = (index: number, value: number) => {
    const newValue = [...sliderValue];
    newValue[index] = value;
    setSliderValue(newValue);
    debouncedUpdateFilter(newValue);
  };

  return (
    <div className="grid gap-2 mt-4">
      <div className="flex items-center gap-4">
        <div className="grid w-full gap-1.5">
          <Label
            htmlFor={`min-${selectedFilter}`}
            className="px-2 text-muted-foreground"
          >
            Min.
          </Label>
          <InputWithAddons
            placeholder="from"
            trailing={suffix}
            containerClassName="mb-2 h-9 rounded-lg"
            type="number"
            name={`min-${selectedFilter}`}
            id={`min-${selectedFilter}`}
            value={sliderValue[0]}
            min={minValue}
            max={maxValue}
            onChange={(e) => handleInputChange(0, Number(e.target.value))}
            disabled
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label
            htmlFor={`max-${selectedFilter}`}
            className="px-2 text-muted-foreground"
          >
            Max.
          </Label>
          <InputWithAddons
            placeholder="to"
            trailing={suffix}
            containerClassName="mb-2 h-9 rounded-lg"
            type="number"
            name={`max-${selectedFilter}`}
            id={`max-${selectedFilter}`}
            value={sliderValue[1]}
            min={minValue}
            max={maxValue}
            onChange={(e) => handleInputChange(1, Number(e.target.value))}
            disabled
          />
        </div>
      </div>
      <Slider
        min={minValue}
        max={maxValue}
        value={sliderValue}
        onValueChange={handleSliderChange}
      />
    </div>
  );
};

export default CustomSlider;
