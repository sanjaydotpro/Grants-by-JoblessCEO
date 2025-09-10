import React from "react";
import Image from "next/image";

function HeroOne() {
  return (
    <div className="hero min-h-fit xl:container lg:container md:container">
      <div className="hero-content bg-slate-900 rounded-xl py-12 sm:px-15 md:px-20 px-3 sm:my-12 sm:mx-12">
        <div className="min-w-xl font-sans-alt">
          <h1 className="text-4xl font-bold text-center font-sans-alt text-slate-100 px-4 my-2 sm:px-0 sm:my-0">
            Start your Credit Card Journey!
          </h1>
          <h2 className="hidden sm:block text-xl my-5 text-center font-sans-alt text-gray-300 lg:w-3/5 mx-auto">
            {/* Find, compare, and manage all your credit cards in one place &
            unlock their full potential with CardiKey. */}
            Find the best credit cards for your needs!
          </h2>
          <div className="feature-cards grid grid-rows-2 lg:grid-cols-2 gap-y-8 sm:gap-y-16 gap-x-14 mt-14 mb-4">
            <div className="card lg:card-side grid sm:gap-6 gap-4 grid-cols-[88px_auto]">
              <figure className="flex justify-center">
                <Image
                  src="/images/icons/search-v2.svg"
                  width={80}
                  height={80}
                  alt="Search"
                />
              </figure>
              <div className="card-body">
                <h2 className="text-xl font-semibold leading-none tracking-tight text-slate-100">
                  Find a Credit Card
                </h2>
                <p className="text-sm sm:text-base text-gray-400 mt-3">
                  Easily find the right credit card for your needs. Just answer
                  simple questionnaire to get personalized credit card
                  suggestions.
                </p>
              </div>
            </div>
            <div className="card lg:card-side grid sm:gap-6 gap-4 grid-cols-[88px_auto]">
              <figure className="flex justify-center">
                <Image
                  src="/images/icons/reward.svg"
                  width={80}
                  height={80}
                  alt="Reward Points"
                />
              </figure>
              <div className="card-body">
                <h2 className="text-xl font-semibold leading-none tracking-tight text-slate-100 font-sans-alt">
                  Manage Reward Points
                </h2>
                <p className="text-sm sm:text-base text-gray-400 mt-3">
                  Easily track and manage your rewards, make informed redemption
                  choices, & optimize your rewards-earning potential.
                </p>
              </div>
            </div>
            <div className="card lg:card-side grid sm:gap-6 gap-4 grid-cols-[88px_auto]">
              <figure className="flex justify-center">
                <Image
                  src="/images/icons/card-management.svg"
                  width={80}
                  height={80}
                  alt="Credit Card"
                />
              </figure>
              <div className="card-body">
                <h2 className="text-xl font-semibold leading-none tracking-tight text-slate-100">
                  Maximize Card Benefits
                </h2>
                <p className="text-sm sm:text-base text-gray-400 mt-3">
                  Get intelligent suggestions on using the best card for each
                  purchase, helping you maximize rewards, and cashbacks,
                  effortlessly.
                </p>
              </div>
            </div>
            <div className="card lg:card-side grid sm:gap-6 gap-4 grid-cols-[88px_auto]">
              <figure className="flex justify-center">
                <Image
                  src="/images/icons/shield.svg"
                  width={80}
                  height={80}
                  alt="Dispute Resolution"
                />
              </figure>
              <div className="card-body">
                <h2 className="text-xl font-semibold leading-none tracking-tight text-slate-100">
                  Resolve Disputes Faster
                </h2>
                <p className="text-sm sm:text-base text-gray-400 mt-3">
                  Say goodbye to transaction disputes that cause headaches.
                  Dispute resolution tools and templates makes this process a
                  breeze.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroOne;
