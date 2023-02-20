"use client";

import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  console.log(user);

  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      router.push("/");
    }
  }, [user, router]);

  return <div>Dahsboard</div>;
}
