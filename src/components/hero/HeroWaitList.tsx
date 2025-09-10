"use client";
import { useState } from "react";
import Image from "next/image";
import { TbCircleCheckFilled } from "react-icons/tb";
import Confetti from "react-confetti";


import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function HeroWaitList() {
  const [email, setEmail] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [waitlisted, setWaitlisted] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async () => {
    if (email) {
      // TODO: Implement waitlist functionality without Supabase
      console.log("Waitlist submission not implemented");
      
      // For now, just show success
      setWaitlisted(true);
      setShowDialog(true);
    }
  };

  return (
    <div className="xl:max-w-(--breakpoint-xl) mx-auto px-6  mb-24">
      <div className="flex flex-col lg:flex-row items-center justify-between mt-12">
        <div className=" sm:w-full lg:w-1/2">
          <Badge className="mb-2 py-1" variant="secondary">
            Cards by CaveFinance
          </Badge>
          <h1 className="text-6xl font-bold leading-tight mb-6">
            Start your Credit Card Journey!
          </h1>
          <p className="text-lg text-gray-500 mb-6">
            Discover and manage credit cards flawlessly with features like
            reward points management, dispute resolution, and more.
          </p>

          <p className="text-lg text-gray-500 mb-6">
            Sign up for our waitlist to be among the first to access it.
          </p>
          {!waitlisted && (
            <div className="flex space-x-1 md:space-x-4 mt-8 mb-2 md:w-96">
              <Input
                className="border p-3 rounded-lg"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <Button variant="secondary" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          )}
          <p className="text-sm text-green-600">
            We&apos;ll notify you when we launch. No spam, promise!
          </p>
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

      {/* success dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <Confetti width={505} height={205} numberOfPieces={70} />
          <DialogHeader>
            <DialogTitle>Success!</DialogTitle>
            <DialogDescription>
              <div className="confetti-background flex flex-col items-center justify-center text-md">
                <TbCircleCheckFilled className="h-24 w-24 text-green-500 mb-4" />
                Your email has been successfully added to the waitlist.
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
