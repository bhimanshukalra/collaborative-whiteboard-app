import { Camera } from "@/types/canvas";
import { clsx, type ClassValue } from "clsx";
import { PointerEvent } from "react";
import { twMerge } from "tailwind-merge";

const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

export const connectionIdToColor = (connectionId: number) => {
  return COLORS[connectionId % COLORS.length];
};

export const pointerEventToCanvasPoint = (
  event: PointerEvent,
  camera: Camera
) => {
  return {
    x: Math.round(event.clientX) - camera.x,
    y: Math.round(event.clientY) - camera.y,
  };
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
