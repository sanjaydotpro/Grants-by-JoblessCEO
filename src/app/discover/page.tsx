import DiscoverCards from "@/components/discovery/DiscoverCards";

export default function Discover() {
  return (
    <>
      <h1 className="text-4xl font-bold text-center p-2">
        Explore Credit Cards, Lounges, and More
      </h1>
      <h3 className="text-xl font-medium text-center mb-1 text-gray-600 p-2">
        Compare 500+ cards and find the best card for your needs.
      </h3>
      <div className="w-16 h-1 bg-blue-600 rounded-full mt-4 mx-auto"></div>
      {/* <Suspense fallback={<div>Loading...</div>}>
        <DiscoverCards />
      </Suspense> */}
    </>
  );
}
