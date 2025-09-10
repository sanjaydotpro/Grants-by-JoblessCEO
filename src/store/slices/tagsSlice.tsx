import { createSlice } from "@reduxjs/toolkit";
import { resetTags } from "../actions";
import { OrganisedTags, SingleTag } from "@/types/index";

const tagsSlice = createSlice({
  name: "tags",
  initialState: {} as OrganisedTags,
  reducers: {
    addTag(state, action) {
      //User will be sending a single tag in the payload
      const tag = action.payload;

      //get the filter from the tag['filter'] and append the given tag to state[filter]
      if (tag.filter in state) {
        state[tag.filter].push(tag);
      } else {
        state[tag.filter] = [tag];
      }
    },
    removeTag(state, action) {
      const { filter, key } = action.payload;

      // Check if only filter is defined and key is not
      if (filter !== undefined && key === undefined) {
        // Delete the filter from the state
        delete state[filter];
      }
      // Check if both key and filter are defined
      else if (key !== undefined && filter !== undefined) {
        // Check if the filter exists in the state
        if (state[filter]) {
          // Filter out the tag with the specified key from the nested structure
          state[filter] = state[filter].filter((tag) => tag.id !== key);
        }

        //if only single tag is left in the filter, delete the filter
        if (state[filter].length === 0) {
          delete state[filter];
        }
      } else if (key !== undefined) {
        // Filter out the tag with the specified key from the state
        for (const filter in state) {
          state[filter] = state[filter].filter((tag) => tag.id !== key);
        }

        //if only single tag is left in the filter, delete the filter
        for (const filter in state) {
          if (state[filter].length === 0) {
            delete state[filter];
          }
        }
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(resetTags, (state, action) => {
      return {};
    });
  },
});

export const { addTag, removeTag } = tagsSlice.actions;
export const filtersReducer = tagsSlice.reducer;
