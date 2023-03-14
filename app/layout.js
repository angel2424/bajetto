"use client";

import Header from "@/components/Header";
import { useEffect } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import "./globals.css";
import { useAuthStore } from "@/stores/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import StoreInitializer from "@/stores/storeInitializer";

export default function RootLayout({ children }) {
  const storeUser = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        updateUser(user);
        setCookie("user", user.uid, {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        });
      } else {
        console.log("User not signed in");
        removeCookie("user", {
          path: "/",
          sameSite: true,
        });
      }
    });
  }, [removeCookie, setCookie, updateUser]);

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Header />
        <CookiesProvider>{children}</CookiesProvider>
      </body>
    </html>
  );
}
