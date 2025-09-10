"use client";

import { Badge } from "@/components/ui/badge";
import { SingleTag } from "@/types/index";
import useTagOperations from "@/store/slices/tagOperations";
import { TbTags } from "react-icons/tb";

export default function Tags() {
  const { activeFilters, handleFilterRemoval } = useTagOperations();
  return (
    <>
      <div className="overflow-x-auto sm:overflow-visible">
        {Object.keys(activeFilters).length > 0 && (
          <div className="searchTags flex items-center overflow-x-auto whitespace-nowrap">
            <TbTags className="h-7 w-7 mr-2 sm:mr-4 text-gray-500 dark:text-gray-400 shrink-0" />
            {Object.entries(activeFilters).map(([tagCategory, tags]) =>
              tags.map((tag: SingleTag) => {
                const categoryBadge =
                  (tagCategory as
                    | "category"
                    | "issuer"
                    | "feature"
                    | "employment"
                    | "income"
                    | "fees"
                    | "valueBack"
                    | "interestRate"
                    | "age"
                    | "cibilScore"
                    | "collaborator"
                    | "default") || "default";

                return (
                  <Badge
                    key={tag.id}
                    variant={categoryBadge}
                    className="px-2 py-1 mr-2 text-sm shrink-0"
                  >
                    {tag.label}
                    <button
                      className="ml-1 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                      onClick={() => handleFilterRemoval({ key: tag.id })}
                      aria-label="Remove tag"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                      >
                        <path
                          d="M16.2426 7.75738L7.75732 16.2427M16.2426 16.2426L7.75732 7.75732"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </Badge>
                );
              })
            )}
          </div>
        )}
      </div>
    </>
  );
}
