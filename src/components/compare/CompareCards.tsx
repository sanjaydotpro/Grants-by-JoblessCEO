"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import ComparisionTable from "./ComparisionTable";

function CompareCards() {
  return (
    <Provider store={store}>
      <div className="flex flex-col gap-4">
        <ComparisionTable />
      </div>
    </Provider>
  );
}

export default CompareCards;
