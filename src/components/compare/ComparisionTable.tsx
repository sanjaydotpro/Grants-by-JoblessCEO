"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { TbChevronsDown } from "react-icons/tb";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";
import { AutocompleteSearch } from "./AutocompleteSearch";
import { searchCards } from "@/app/services/discover/searchCards";
import { searchCardsResponse } from "@/types/index";

function ComparisionTable() {
  const [cards, setCards] = useState<searchCardsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        // Fetch initial cards (you can change these queries as needed)
        const [card1, card2, card3] = await Promise.all([
          searchCards("SBI Unnati"),
          searchCards("YES Bank EMI Card"),
          searchCards("HDFC Swiggy"),
        ]);

        setCards({
          totalResults:
            card1.totalResults + card2.totalResults + card3.totalResults,
          cards: [...card1.cards, ...card2.cards, ...card3.cards].slice(0, 3),
        });
      } catch (err) {
        setError("Error fetching cards. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!cards || cards.totalResults === 0) {
    return <div>No cards found</div>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] p-4"></TableHead>
            {cards.cards.map((card, index) => (
              <TableHead key={card.id} className="p-4">
                <div className="w-full flex flex-col items-center">
                  <div className="relative w-full max-w-[250px]">
                    <AutocompleteSearch />
                  </div>
                  <div className="mt-2 flex justify-center">
                    <Image
                      src={`/images/credit-cards/${card.image}`}
                      alt={card.name}
                      width={250}
                      height={158}
                      loading="lazy"
                      className="rounded-lg max-w-[250px]"
                    />
                  </div>
                  <div className="text-lg font-light mt-4">{card.name}</div>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Highlights Section */}
          <Collapsible asChild defaultOpen>
            <>
              <CollapsibleTrigger asChild>
                <TableRow>
                  <TableCell className="text-lg" colSpan={4}>
                    <div className="flex font-bold text-md">
                      <TbChevronsDown className="w-4 h-4 self-center mr-2" />
                      Highlights
                    </div>
                  </TableCell>
                </TableRow>
              </CollapsibleTrigger>
              <CollapsibleContent asChild>
                <TableRow className="text-center">
                  <TableCell className="font-medium p-1">Joining Fee</TableCell>
                  {cards.cards.map((card) => (
                    <TableCell key={`${card.id}-joining-fee`}>
                      {card.name || "----"}
                    </TableCell>
                  ))}
                </TableRow>
              </CollapsibleContent>
              <CollapsibleContent asChild>
                <TableRow className="text-center">
                  <TableCell className="font-medium">Renewal Fee</TableCell>
                  {cards.cards.map((card) => (
                    <TableCell key={`${card.id}-renewal-fee`}>
                      {card.name || "----"}
                    </TableCell>
                  ))}
                </TableRow>
              </CollapsibleContent>
            </>
          </Collapsible>

          {/* Add more sections (Features, Fees, Eligibility) similarly */}
        </TableBody>
      </Table>
    </>
  );
}

export default ComparisionTable;
