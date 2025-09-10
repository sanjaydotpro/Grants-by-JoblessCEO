import { configureStore } from "@reduxjs/toolkit";
import { filtersReducer, addTag, removeTag } from "./slices/tagsSlice";
import {
  compareReducer,
  addToCompare,
  removeFromCompare,
  toggleCompare,
} from "./slices/compareCardsSlice";
import { sidebarReducer, toggleSidebar } from "./slices/sidebarSlice";
import { resetTags, resetCompareCards } from "./actions";
import { getAllFilters } from "@/app/services/discover/getAllFilters";
// import { getAllCards } from "@/app/services/discover/getAllCards";
import { getAllNotifications } from "@/app/services/notifications/getAllNotifications";

const store = configureStore({
  reducer: {
    selectedFilters: filtersReducer,
    compareCards: compareReducer,
    sidebar: sidebarReducer,
    // [getAllFilters.reducerPath]: getAllFilters.reducer,
    // [getAllCards.reducerPath]: getAllCards.reducer,
    [getAllNotifications.reducerPath]: getAllNotifications.reducer,
    // [searchCards.reducerPath]: searchCards.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // getAllFilters.middleware,
      // getAllCards.middleware,
      getAllNotifications.middleware
      // searchCards.middleware
    ),
});

export {
  store,
  resetTags,
  resetCompareCards,
  addTag,
  removeTag,
  addToCompare,
  removeFromCompare,
  toggleCompare,
  toggleSidebar,
};
