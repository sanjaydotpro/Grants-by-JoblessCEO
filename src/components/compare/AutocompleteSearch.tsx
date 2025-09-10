"use client";

import { searchCards } from "@/app/services/discover/searchCards";
import { AutoComplete, type Option } from "./AutoComplete";
import { useState, useEffect } from "react";

export function AutocompleteSearch() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [value, setValue] = useState<Option>();

  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        setIsLoading(true);
        try {
          const data = await searchCards(query);
          setOptions(
            data.cards.map((item: any) => ({
              value: item.id,
              label: item.name,
            }))
          );
        } catch (error) {
          console.error("Error fetching search results:", error);
          setOptions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setOptions([]);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="not-prose flex flex-col gap-4">
      <AutoComplete
        options={options}
        emptyMessage="Enter a different card"
        placeholder="Replace this card"
        isLoading={isLoading}
        onValueChange={setValue}
        value={value}
        disabled={isDisabled}
        onInputChange={setQuery}
      />
    </div>
  );
}
