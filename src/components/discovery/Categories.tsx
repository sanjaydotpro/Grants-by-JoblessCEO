import React, { useRef, useEffect, useCallback, useState } from "react";
import { Button } from "../ui/button";
import { allCategories } from "@/data/inputs";
import { SingleTag } from "@/types";
import useTagOperations from "@/store/slices/tagOperations";
import { useSearchParams } from "next/navigation";

function Categories() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { activeFilters, handleFilterAdd, handleFilterRemoval } =
    useTagOperations();
  const searchParams = useSearchParams();
  const [hasAddedCategory, setHasAddedCategory] = useState(false);

  const selectedTags: SingleTag[] = activeFilters["category"] || [];

  const toggleSelection = (selectedTag: SingleTag) => {
    // Check if the selectedTag exists under the selectedFilter in the state
    const isSelected =
      activeFilters["category"]?.some((tag) => tag.id === selectedTag.id) ??
      false;

    if (isSelected) {
      // If the selectedTag is already selected, remove it
      handleFilterRemoval({ filter: "category", key: selectedTag.id });
    } else {
      // If the selectedTag is not selected, add it
      handleFilterAdd(selectedTag);
    }

    inputRef.current?.focus();
  };

  const addCategoryFromUrl = useCallback(() => {
    const category = searchParams?.get("category");
    if (category && !hasAddedCategory) {
      const categoryToAdd = allCategories.find(
        (c) => c.value.toLowerCase() === category.toLowerCase()
      );
      if (
        categoryToAdd &&
        !activeFilters["category"]?.some(
          (tag) => tag.value.toLowerCase() === category.toLowerCase()
        )
      ) {
        handleFilterAdd(categoryToAdd);
        setHasAddedCategory(true);
      }
    }
  }, []);

  useEffect(() => {
    addCategoryFromUrl();
  }, []); // Empty dependency array

  return (
    <div className="w-full overflow-x-auto sm:overflow-visible whitespace-nowrap sm:whitespace-normal sm:flex sm:flex-wrap sm:mb-0">
      {allCategories.map((category, index) => (
        <Button
          key={`${category.label}`}
          variant={
            selectedTags?.some((tag) => tag.id === category.id)
              ? "default"
              : "outline-solid"
          }
          className="rounded-full mr-1 mb-2"
          onClick={() => toggleSelection(category)}
        >
          {category.IconName && <category.IconName className="mr-2" />}
          {category.label}
        </Button>
      ))}
    </div>
  );
}

export default Categories;
