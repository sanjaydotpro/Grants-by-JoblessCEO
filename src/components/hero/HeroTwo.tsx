"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  HiCreditCard,
  HiOutlineCreditCard,
  HiOutlineShoppingBag,
} from "react-icons/hi";
import { TbSofa } from "react-icons/tb";

export function HeroTwo() {
  return (
    <div className="xl:max-w-(--breakpoint-xl) mx-auto px-4 mb-24">
      <div className="flex flex-col lg:flex-row items-center justify-between mt-12">
        <div className="sm:w-full lg:w-1/2">
          <Badge className="mb-2 py-1" variant="secondary">
            Cards by CaveFinance
          </Badge>
          {/* <h1 className="text-6xl font-bold leading-tight mb-6">
            Your Credit Card Journey Starts Here
          </h1> */}
          <h1 className="text-6xl font-bold leading-tight mb-6">
            Elevate Your Credit Card Game
          </h1>
          <p className="text-lg text-gray-500 mb-4">
            Discover and manage credit cards flawlessly, know the best card to
            use before you shop{" "}
            <i className="text-gray-400 font-thin">anywhere</i> to maximize your
            rewards.
          </p>
          <div className="flex flex-row gap-4">
            <div className="mt-8">
              <Link href="/discover/credit-cards" className="flex items-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="p-4 py-6 rounded-full"
                >
                  <HiOutlineCreditCard className="mr-2 text-xl" />
                  <span>Cards</span>
                </Button>
              </Link>
            </div>
            <div className="mt-8 relative">
              <Badge
                variant="category"
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-xs z-10 px-3 py-1 whitespace-nowrap"
              >
                Coming Soon
              </Badge>
              <Button
                variant="outline"
                size="lg"
                className="p-4 py-6 rounded-full"
                disabled
              >
                <div className="flex items-center">
                  <TbSofa className="mr-2 text-xl" />
                  <span>Lounges</span>
                </div>
              </Button>
            </div>
            <div className="mt-8 relative">
              <Badge
                variant="category"
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-xs z-10 px-3 py-1 whitespace-nowrap"
              >
                Coming Soon
              </Badge>

              <Button
                variant="outline"
                size="lg"
                className="p-4 py-6 rounded-full"
                disabled
              >
                <div className="flex items-center">
                  <HiOutlineShoppingBag className="mr-2 text-xl" />
                  <span>Shopping</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center dark:hidden">
          <Image
            alt="Hero Image"
            className="object-cover rounded-lg"
            height={1108}
            src="/images/cardGrid.png"
            style={{
              aspectRatio: "1280/1108",
              objectFit: "cover",
            }}
            width={1280}
          />
        </div>
        <div className="hidden dark:flex lg:w-1/2 mt-12 lg:mt-0 justify-center">
          <Image
            alt="Hero Image"
            className="object-cover rounded-lg"
            height={1108}
            src="/images/cardGridDark.png"
            style={{
              aspectRatio: "1280/1108",
              objectFit: "cover",
            }}
            width={1280}
          />
        </div>
      </div>
    </div>
  );
}
