"use client";

import React from "react";
import Link from "next/link";
import ModeToggle from "@/components/ui/theme-toggle";
// import Register from "@/app/(auth)/auth/page";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

import {
	PiMagicWandFill,
	PiCaretDownBold,
	PiScalesBold,
	PiAirplaneTiltFill,
	PiGasPumpFill,
	PiBowlFoodFill,
	PiPlayFill,
	PiStudentFill,
	PiShoppingCartSimpleFill,
	PiSunBold,
	PiSunFill,
	PiMoonStarsFill,
} from "react-icons/pi";
import {
	TbThumbUpFilled,
	TbCategory,
	TbCoinRupee,
	TbDoorEnter,
	TbLogin,
	TbMenu2,
	TbSofa,
	TbDiscount,
} from "react-icons/tb";

import {
	IoLogIn,
	IoLogOut,
	IoAirplane,
	IoGitCompareSharp,
} from "react-icons/io5";
import {
	HiFire,
	HiBriefcase,
	HiGlobe,
	HiShoppingBag,
	HiCreditCard,
	HiMenu,
} from "react-icons/hi";

import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { allCategories } from "@/data/inputs";
import { Badge } from "../ui/badge";
function NavOne() {
	return (
		<header className="navbar sticky top-0 z-40 w-full backdrop-blur-sm flex-none transition-all duration-500 ease-in-out lg:z-50 border-b border-slate-700/20 bg-slate-900/95 supports-backdrop-blur:bg-slate-900/80">
			<div className="container flex h-16 items-center justify-between transition-colors duration-300 ease-in-out text-white">
				{/* Hamburger Menu */}
				<div className="sm:hidden">
					<Drawer>
						<DrawerTrigger>
							<div className="hamburger-menu focus:outline-hidden">
								<TbMenu2 size="1.5em" />
							</div>
						</DrawerTrigger>
						<DrawerContent>
							<div className="w-full shadow-xl bg-white dark:bg-slate-950 mt-3 transition-colors duration-300 ease-in-out">
								<a className="flex items-center space-x-2 mx-2 my-2" href="/">
									<Image
										src="/images/logo/logo.png"
										width={140}
										height={38}
										alt="Logo"
									/>
								</a>
								<div className="flex flex-col space-y-6 px-4 py-2">
									<ul>
										<strong>Find a Card</strong>
										<div className="w-full mt-4">
											<button
												className="flex text-slate-600 dark:text-slate-400 items-center cursor-not-allowed py-2 opacity-50"
												disabled
											>
												<div className="dark:hidden mr-2">
													<Image
														src="/images/icons/sensei-light.png"
														alt="sensei"
														width={18}
														height={18}
													/>
												</div>
												<div className="hidden dark:block mr-2">
													<Image
														src="/images/icons/sensei-dark.png"
														alt="sensei"
														width={18}
														height={18}
													/>
												</div>
												Ask Sensei{" "}
												<span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
													Coming Soon
												</span>
											</button>
										</div>
										<button
											className="flex text-slate-600 dark:text-slate-400 items-center cursor-not-allowed py-2 opacity-50"
											disabled
										>
											<IoGitCompareSharp className="mr-2" />
											Compare Cards{" "}
											<span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
												Coming Soon
											</span>
										</button>
										<button
											className="flex text-slate-600 dark:text-slate-400 items-center cursor-not-allowed py-2 opacity-50"
											disabled
										>
											<TbSofa className="mr-2" />
											Explore Lounges{" "}
											<span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
												Coming Soon
											</span>
										</button>
										<button
											className="flex text-slate-600 dark:text-slate-400 items-center cursor-not-allowed py-2 opacity-50"
											disabled
										>
											<TbDiscount className="mr-2" />
											Deal Finder{" "}
											<span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
												Coming Soon
											</span>
										</button>
									</ul>

								</div>
							</div>
							<DrawerFooter>
								<p className="text-center text-sm text-slate-500 antialiased">
									Copyright © {new Date().getFullYear()} CaveFinance. All rights
									reserved.
								</p>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</div>
				<div className="gap-6 md:gap-10 flex">
					{/* logo */}
					<a className="flex items-center space-x-2" href="/">
						<Image
							src="/images/logo/logo.png"
							width={140}
							height={38}
							alt="Logo"
						/>
					</a>
					{/* primary nav options */}
					<div className="hidden nav-options items-center space-x-2 sm:flex  justify-between font-medium">
						<NavigationMenu>
							<NavigationMenuList>
								{/* Add this later */}
								{/* <NavigationMenuItem>
                  <NavigationMenuTrigger>Find a Card</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <button
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-hidden focus:shadow-md"
                            onClick={() => alert("Coming Soon")}
                          >
                            <div className="flex justify-center items-center">
                              <div className="dark:hidden">
                                <Image
                                  src="/images/icons/sensei-light.png"
                                  alt="sensei"
                                  width={24}
                                  height={24}
                                />
                              </div>
                              <div className="hidden dark:block">
                                <Image
                                  src="/images/icons/sensei-dark.png"
                                  alt="sensei"
                                  width={24}
                                  height={24}
                                />
                              </div>
                            </div>
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Confused? <br></br>Just Ask Sensei
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Don&apos;t stress over choosing the right credit
                              card. Just <i>Ask Sensei</i> and let the wisdom
                              flow.
                            </p>
                          </button>
                        </NavigationMenuLink>
                      </li>
                      <ListItem
                        href="/discover/credit-cards/new"
                        label="My First Card"
                        IconName={HiCreditCard}
                      >
                        Don&apos;t have a credit card? No worries, we&apos;ve
                        got you covered!
                      </ListItem>
                      <ListItem
                        href="/compare/credit-cards"
                        label="Compare Cards"
                        IconName={IoGitCompareSharp}
                      >
                        Compare hundreds of cards and make an informed decision.
                      </ListItem>
                      <ListItem
                        href="/discover/credit-cards/lifetime-free"
                        label="Lifetime Free Cards"
                        IconName={HiFire}
                      >
                        Truly free cards. No joining fees & No annual renewal
                        fees
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem> */}

								<NavigationMenuItem>
													<NavigationMenuTrigger>Categories</NavigationMenuTrigger>
													<NavigationMenuContent>
														<ul className="grid gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] capitalize">
															{allCategories.map((category) => (
																<ListItem
																	key={category.label}
																	label={category.label}
																	href={category.href}
																	IconName={category.IconName}
																>
																	{category.description}
																</ListItem>
															))}
														</ul>
													</NavigationMenuContent>
												</NavigationMenuItem>
												{/* TODO: Add Explore Lounges */}
												<NavigationMenuItem>
									<NavigationMenuLink
										className={`${navigationMenuTriggerStyle()} cursor-not-allowed opacity-50`}
									>
										Lounges
										<Badge variant="default" className="ml-2">
											Coming Soon
										</Badge>
									</NavigationMenuLink>
								</NavigationMenuItem>
								{/* TODO: Add Shop Smart */}
								<NavigationMenuItem>
									<NavigationMenuLink
										className={`${navigationMenuTriggerStyle()} cursor-not-allowed opacity-50`}
									>
										Deal Finder
										<Badge variant="default" className="ml-2">
											Coming Soon
										</Badge>
									</NavigationMenuLink>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>
				</div>
				<div className="flex items-center lg:gap-6">
					<div className="nav-controls flex">
						{/* TODO: Auth Controls & Dialog */}
						{/* <Dialog>
            <DialogTrigger>
              <IoLogIn className="mr-5 text-xl inline-flex m-auto" />
            </DialogTrigger>
            <DialogContent style={{ width: "max-content", maxWidth: "none" }}>
              <DialogHeader>
                <div className="text-2xl font-bold text-center">
                  Login or Create an account
                </div>
              </DialogHeader>
              <Register />
            </DialogContent>
          </Dialog> */}

						<ModeToggle />
					</div>
				</div>
			</div>
		</header>
	);
}

type ListItemProps = React.ComponentPropsWithoutRef<"a"> & {
	IconName?: React.ElementType | null | undefined;
	label?: string | null;
};

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
	({ className, label, children, IconName, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<a
						ref={ref}
						className={cn(
							"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
							className,
						)}
						{...props}
					>
						<div className="flex gap-3 leading-none font-semibold">
							{/* //render prop IconName as component Here */}
							{IconName && <IconName />}
							{label}
						</div>
						<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
							{children}
						</p>
					</a>
				</NavigationMenuLink>
			</li>
		);
	},
);
ListItem.displayName = "ListItem";

export default NavOne;
