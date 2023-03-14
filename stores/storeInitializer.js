"use client";

import { useRef } from "react";
import { useAuthStore } from "./store";

function StoreInitializer({ userCookies }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useAuthStore.setState({ userCookies });
    initialized.current = true;
  }

  return null;
}

export default StoreInitializer;
