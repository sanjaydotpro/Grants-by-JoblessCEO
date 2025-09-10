import React, { useEffect, useState, useRef } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { TbClearAll } from "react-icons/tb";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { SingleTag, OrganisedTags } from "@/types/index";
import useTagOperations from "@/store/slices/tagOperations";
import { ScrollArea } from "./scroll-area";

const CustomCombobox = ({
  selectedFilter,
  data,
}: {
  selectedFilter: string;
  data: SingleTag[];
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [openCombobox, setOpenCombobox] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const { activeFilters, handleFilterAdd, handleFilterRemoval } =
    useTagOperations();

  let noSelectionText: string = "Any";
  let multipleSelectionText: string = "selected";
  let searchPlaceholderText: string = "Search...";

  const selectedTags: SingleTag[] =
    activeFilters[selectedFilter as keyof OrganisedTags];

  if (selectedFilter === "category") {
    noSelectionText = "Any Category";
    multipleSelectionText = "categories";
    searchPlaceholderText = "Search categories...";
  } else if (selectedFilter === "issuer") {
    noSelectionText = "Any Issuer";
    multipleSelectionText = "issuers";
    searchPlaceholderText = "Search issuers...";
  } else if (selectedFilter === "feature") {
    noSelectionText = "Any Feature";
    multipleSelectionText = "features";
    searchPlaceholderText = "Search features...";
  } else if (selectedFilter === "collaborator") {
    noSelectionText = "Any Collaborator";
    multipleSelectionText = "collaborators";
    searchPlaceholderText = "Search collaborators...";
  } else if (selectedFilter === "network") {
    noSelectionText = "Any Network";
    multipleSelectionText = "networks";
    searchPlaceholderText = "Search networks...";
  }

  const onComboboxOpenChange = (value: boolean) => {
    setOpenCombobox(value);
    if (value) {
      // Delay focus to prevent immediate focus on open
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.blur();
        }
      }, 0);
    }
  };

  const clearAll = (selectedFilter: string) => {
    handleFilterRemoval({ filter: selectedFilter });
  };

  const toggleSelection = (selectedFilter: string, selectedTag: SingleTag) => {
    // Check if the selectedTag exists under the selectedFilter in the state
    const isSelected =
      activeFilters[selectedFilter]?.some((tag) => tag.id === selectedTag.id) ??
      false;

    if (isSelected) {
      // If the selectedTag is already selected, remove it
      handleFilterRemoval({ filter: selectedFilter, key: selectedTag.id });
    } else {
      // If the selectedTag is not selected, add it
      handleFilterAdd(selectedTag);
    }
  };

  return (
    <>
      <Popover
        open={openCombobox}
        onOpenChange={onComboboxOpenChange}
        modal={true}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCombobox}
            className="sm:w-60 w-40 justify-between text-foreground"
          >
            <span className="truncate text-slate-800 dark:text-slate-300 font-normal">
              {selectedTags ? (
                <>
                  {selectedTags.length === 0 && noSelectionText}
                  {selectedTags.length === 1 && selectedTags[0].label}
                  {selectedTags.length === 2 &&
                    selectedTags.map(({ label }) => label).join(", ")}
                  {selectedTags.length > 2 &&
                    `${selectedTags.length} ${multipleSelectionText}`}
                </>
              ) : (
                <>{noSelectionText}</>
              )}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0">
          <Command loop>
            {/* <CommandInput
              ref={inputRef}
              placeholder={searchPlaceholderText}
              value={inputValue}
              onValueChange={setInputValue}
            /> */}

            <CommandGroup className="max-h-[40vh] overflow-y-auto">
              {data.map((tag) => {
                const isActive =
                  activeFilters[selectedFilter]?.includes(tag) || false;
                return (
                  <CommandItem
                    key={tag.id}
                    value={tag.value}
                    onSelect={() => toggleSelection(selectedFilter, tag)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        isActive ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex-1">{tag.label}</div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator alwaysRender />
            <CommandGroup>
              <CommandItem
                value={`:${inputValue}:`}
                className="text-xs text-muted-foreground"
                onSelect={() => clearAll(selectedFilter)}
              >
                <div className={cn("mr-2 h-4 w-4")} />
                <TbClearAll className="mr-2 h-2.5 w-2.5" />
                Clear All
              </CommandItem>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CustomCombobox;
