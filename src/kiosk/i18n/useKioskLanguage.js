import { useEffect, useState } from "react";
import { translations } from "./translations";

export default function useKioskLanguage() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("kiosk_language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("kiosk_language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "de" : "en"));
  };

  const t = translations[language];

  return {
    language,
    setLanguage,
    toggleLanguage,
    t,
  };
}
