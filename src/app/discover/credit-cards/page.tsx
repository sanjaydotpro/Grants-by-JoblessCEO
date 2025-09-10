import DiscoverCards from "@/components/discovery/DiscoverCards";
import { DiscoverySkeleton } from "@/components/discovery/DiscoverySkeleton";
import FooterSlim from "@/components/footer/FooterSlim";
import NavOne from "@/components/navbar/NavOne";
import { Suspense } from "react";

export default function DiscoverCreditCards() {
  return (
    <>
      <NavOne />
      {/* <main className="flex flex-col items-center justify-between py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Credit Cards</h1>
        <div className="w-16 h-1 bg-blue-600 rounded-full mb-8"></div>
        <p className="text-lg text-center text-gray-600 px-4 sm:px-2 md:px-16 lg:px-24 w-full md:w-3/4 lg:w-1/2">
          Explore all the credit cards in the market under one roof. Search,
          filter and sort the cards to narrow down the best credit cards for
          your needs.
        </p>
      </main> */}
      <h1 className="text-3xl font-bold text-center p-2 mt-8">
        🔎 Explore Credit Cards
      </h1>
      <h3 className="text-xl text-center mx-4 text-gray-600 p-2">
        Narrow your search using filters and find the best card for your needs.
      </h3>
      <Suspense fallback={<DiscoverySkeleton />}>
        <DiscoverCards />
      </Suspense>
      {/* footer */}
      {/* <FooterSlim /> */}
    </>
  );
}
