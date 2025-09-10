import { createSlice } from "@reduxjs/toolkit";
import { resetCompareCards } from "../actions";
import { Card } from "@/types/index";

const compareSlice = createSlice({
  name: "compareCards",
  initialState: [] as Card[],
  reducers: {
    addToCompare(state, action) {
      //User will be sending a single card in the payload
      const card = action.payload;

      //get the card is not already added to the comparison list, add it
      if (!state.some((c) => c.id === card.id)) {
        state.push(card);
      }
    },
    removeFromCompare(state, action) {
      const id = action.payload?.id;
      // Check if only filter is defined and id is not
      if (id !== 0) {
        // Filter out the card with the specified id from the state
        state = state.filter((card) => card.id !== id);
      } else {
        // Reset the state to an empty array
        state = [];
      }
    },
    toggleCompare(state, action) {
      const card = action.payload;
      // Check if the card is already in the comparison list, remove it
      const index = state.findIndex((c) => c.id === card.id);
      if (index !== -1) {
        state.splice(index, 1);
      } else {
        // Add the card to the comparison list
        state.push(card);
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(resetCompareCards, (state, action) => {
      return [];
    });
  },
});

export const { addToCompare, removeFromCompare, toggleCompare } =
  compareSlice.actions;
export const compareReducer = compareSlice.reducer;
