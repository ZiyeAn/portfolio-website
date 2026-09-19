"use client";

import { useSyncExternalStore } from "react";

const query = "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};
const getSnapshot = () => window.matchMedia(query).matches;
const getServerSnapshot = () => false;

export function usePointerEffects() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
