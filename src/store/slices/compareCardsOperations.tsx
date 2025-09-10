import { useDispatch, useSelector } from "react-redux";
import {
  addToCompare,
  removeFromCompare,
  toggleCompare,
  resetCompareCards,
} from "@/store";
import { Card } from "@/types/index";

function useCompareCardsOperations() {
  const dispatch = useDispatch();

  const activeComparisions: Card[] = useSelector((state: any) => {
    return state.compareCards;
  });

  const handleCardAdd = (card: Card) => {
    dispatch(addToCompare(card));
  };

  const handleCardRemoval = (id: number) => {
    dispatch(removeFromCompare({ id }));
  };

  const handleResetClick = () => {
    dispatch(resetCompareCards());
  };

  const handleCardToggle = (card: Card) => {
    dispatch(toggleCompare(card));
  };

  return {
    activeComparisions,
    handleCardAdd,
    handleCardRemoval,
    handleCardToggle,
    handleResetClick,
  };
}

export default useCompareCardsOperations;
