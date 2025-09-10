"use client";

import { Button } from "@/components/ui/button";
import { RiArrowGoBackFill } from "react-icons/ri";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

function ResetPasword() {
  return (
    <div className="container flex h-screen">
      <div className="m-auto w-96">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Reset your password</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Registered Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Reset Password</Button>
          </CardFooter>
          <div className="px-6 mb-7">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  OR
                </span>
              </div>
            </div>
            <Link href="/auth">
              <Button className="w-full" variant="outline">
                <RiArrowGoBackFill className="mr-2 h-4 w-4" />
                Back to Login
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ResetPasword;
