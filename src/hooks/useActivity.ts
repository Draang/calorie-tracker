import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

export function useActivity() {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error(
      "el hook solo puede sert utilizado dentro de un activity context"
    );
  }
  return context;
}
