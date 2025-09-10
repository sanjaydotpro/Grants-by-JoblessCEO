import useTagOperations from "@/store/slices/tagOperations";
import { Slider } from "@/components/ui/multi-slider";
import React from "react";
import { capitalizeFirstLetter } from "@/lib/helper/miscFunctions";
import { OrganisedTags, SingleTag } from "@/types";

const CustomSlider = ({
  selectedFilter,
  data,
}: {
  selectedFilter: string;
  data: SingleTag[];
}) => {
  const { activeFilters, handleFilterAdd, handleFilterRemoval } =
    useTagOperations();

  const selectedTags: SingleTag[] =
    activeFilters[selectedFilter as keyof OrganisedTags];

  const [sliderValue, setSliderValue] = React.useState(() => {
    const source =
      selectedTags && selectedTags.length > 0 ? selectedTags[0] : data[0];
    const minValue = parseInt(source.value.split(",")[0]);
    const maxValue = parseInt(source.value.split(",")[1]);
    return [minValue, maxValue];
  });

  const prefix = data[0].prefix;
  const suffix = data[0].suffix;
  const minSteps = selectedFilter === "income" ? 1 : 0;

  const label = capitalizeFirstLetter(selectedFilter);

  const handleSliderChange = (newValue: number[]) => {
    setSliderValue(newValue);
    handleFilterRemoval({ filter: selectedFilter });

    setTimeout(() => {
      const newTag = {
        filter: selectedFilter,
        value: `${newValue[0]},${newValue[1]}`,
        label: `${label}: ${prefix}${newValue[0]}-${newValue[1]}${suffix}`,
        id: data[0].id,
        prefix,
        suffix,
      };

      handleFilterAdd(newTag);
    }, 1000);
    //slight delay
  };

  return (
    <div className="mt-11">
      <Slider
        value={sliderValue}
        min={parseInt(data[0].value.split(",")[0])}
        max={parseInt(data[0].value.split(",")[1])}
        step={1}
        minStepsBetweenThumbs={minSteps}
        onValueChange={handleSliderChange}
        formatLabel={(value) => `${prefix}${value}${suffix}`}
      />
    </div>
  );
};

export default CustomSlider;
