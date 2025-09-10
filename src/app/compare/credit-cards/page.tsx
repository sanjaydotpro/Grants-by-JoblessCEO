import { AutocompleteSearch } from "@/components/compare/AutocompleteSearch";
import CompareCards from "@/components/compare/CompareCards";
import ComparisionTable from "@/components/compare/ComparisionTable";
import DiscoverCards from "@/components/discovery/DiscoverCards";
import FooterSlim from "@/components/footer/FooterSlim";
import NavOne from "@/components/navbar/NavOne";

export default function CompareCreditCards() {
  return (
    <>
      <NavOne />
      <main className="flex flex-col items-center justify-between py-12">
        <h1 className="text-4xl font-bold text-center p-2">
          Compare Credit Cards
        </h1>
        <h3 className="text-xl font-medium text-center mb-1 text-gray-600 p-2">
          Compare credit cards to find the best one for you.
        </h3>
        <div className="w-16 h-1 bg-blue-600 rounded-full mt-4 mx-auto"></div>
      </main>
      <div
        className="container mx-auto min-h-fit px-4 sm:px-8 md:px-16 xl:px-24 my-12 mt-0"
        id="compare"
      >
        <CompareCards />
      </div>
      {/* footer */}
      {/* <FooterSlim /> */}
    </>
  );
}
