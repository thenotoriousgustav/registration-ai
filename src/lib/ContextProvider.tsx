"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [photo, setPhoto] = useState<any>(null);
  const [examId, setExamId] = useState<any>(null);

  return (
    <AppContext.Provider value={{ photo, setPhoto, examId, setExamId }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
