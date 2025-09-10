import { useDispatch, useSelector } from "react-redux";
import { addTag, removeTag } from "@/store";
import { SingleTag, OrganisedTags } from "@/types/index";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function useTagOperations() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const resetPageNumber = () => {
    const newUrl = `${pathname}`;
    router.push(newUrl, { scroll: false });
  };

  const activeFilters: OrganisedTags = useSelector(
    (state: any) => state.selectedFilters
  );

  const handleFilterAdd = (tag: SingleTag) => {
    dispatch(addTag(tag));
    resetPageNumber();
  };

  const handleFilterRemoval = ({
    filter,
    key,
  }: {
    filter?: string;
    key?: number | string;
  }) => {
    const payload = { filter, key };
    dispatch(removeTag(payload));
    resetPageNumber();
  };

  return { activeFilters, handleFilterAdd, handleFilterRemoval };
}

export default useTagOperations;
