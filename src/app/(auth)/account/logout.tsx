"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    // TODO: Implement logout functionality without Supabase
    console.log("Logout not implemented");
    router.refresh();
  };

  return (
    <div>
      <Button className="btn btn-primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Logout;
