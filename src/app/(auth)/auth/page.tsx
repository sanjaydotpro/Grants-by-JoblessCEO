"use client";

import { Button } from "@/components/ui/button";
import {
  RiGoogleFill,
  RiFacebookCircleFill,
  RiAppleFill,
  RiAttachmentLine,
  RiHeartAddFill,
  RiMegaphoneFill,
  RiScissorsCutFill,
  RiCoupon3Fill,
  RiTrophyFill,
  RiThunderstormsFill,
} from "react-icons/ri";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";



function Register() {
  const [email, setEmail] = useState("example@email.com");
  const [password, setPassword] = useState("example-password");
  const router = useRouter();


  const loginInWithGoogle = async () => {
    // TODO: Implement Google authentication
    console.log("Google login not implemented");
  };

  const loginInWithPassword = async () => {
    // TODO: Implement password authentication
    console.log("Password login not implemented");
  };

  return (
    <div className="flex flex-row mt-3">
      <div className="flex m-auto">
        <Card className="w-[450px] mr-5">
          <CardHeader>
            <CardTitle>Why need an account?</CardTitle>
            <CardDescription>
              well, because it unlocks a lot of new features!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mt-2">
              <RiHeartAddFill className="h-5 w-5 mt-3" />
              <AlertTitle className="ml-2">Save to Favorites!</AlertTitle>
              <AlertDescription className="ml-2 text-slate-500 dark:text-slate-400">
                Save your favorite cards to the list.
              </AlertDescription>
            </Alert>
            <Alert className="mt-2">
              <RiCoupon3Fill className="h-5 w-5 mt-3" />
              <AlertTitle className="ml-2">Never Miss Out!</AlertTitle>
              <AlertDescription className="ml-2 text-slate-500 dark:text-slate-400">
                Get notified about the offers on your cards.
              </AlertDescription>
            </Alert>
            <Alert className="mt-2">
              <RiTrophyFill className="h-5 w-5 mt-3" />
              <AlertTitle className="ml-2">Earn Karma!</AlertTitle>
              <AlertDescription className="ml-2 text-slate-500 dark:text-slate-400">
                Review the cards you own to earn karma.
              </AlertDescription>
            </Alert>
            <Alert className="mt-2">
              <RiThunderstormsFill className="h-5 w-5 mt-3" />
              <AlertTitle className="ml-2">and so much more!</AlertTitle>
              <AlertDescription className="ml-2 text-slate-500 dark:text-slate-400">
                to juice out every benefit out of that credit card.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Tabs defaultValue="login" className="w-[350px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader className="space-y-1 -mt-3">
                {/* <CardTitle className="text-2xl">
                  Login to your account
                </CardTitle>
                <CardDescription>
                  and shortlist the cards you like.
                </CardDescription> */}
              </CardHeader>
              <CardContent className="grid gap-4">
                {/* Social Auth */}
                <div className="px-6 mb-3">
                  <div className="grid grid-cols-3 gap-4">
                    <Button onClick={loginInWithGoogle} variant="outline">
                      <RiGoogleFill className="h-5 w-5" />
                    </Button>
                    <Button variant="outline">
                      <RiFacebookCircleFill className="h-5 w-5" />
                    </Button>
                    <Button variant="outline">
                      <RiAppleFill className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <div className="relative mb-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                  />
                </div>
                <div>
                  <Link href="/reset-password">
                    <label
                      className="underline decoration-dotted text-sm text-slate-400 cursor-pointer"
                      htmlFor="password-reset"
                    >
                      Forgot your password?
                    </label>
                  </Link>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Login</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader className="space-y-1">
                {/* <CardTitle className="text-2xl">Create new account</CardTitle> */}
                <CardDescription>
                  By creating an account, you agree to our{" "}
                  {"Terms & Conditions"} & {"Privacy Policy"}.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {/* Social Auth */}
                <div className="px-6 mb-2">
                  <div className="grid grid-cols-3 gap-4">
                    <Button onClick={loginInWithGoogle} variant="outline">
                      <RiGoogleFill className="h-5 w-5" />
                    </Button>
                    <Button variant="outline">
                      <RiFacebookCircleFill className="h-5 w-5" />
                    </Button>
                    <Button variant="outline">
                      <RiAppleFill className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Create an account</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Register;
