import { useEffect } from "react";

export default function useIdleReset({
  timeout = 60000,
  onIdle,
  enabled = true,
}) {
  useEffect(() => {
    if (!enabled) return;

    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        onIdle?.();
      }, timeout);
    };

    const events = [
      "mousemove",
      "mousedown",
      "click",
      "touchstart",
      "touchmove",
      "keydown",
      "scroll",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(timer);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [timeout, onIdle, enabled]);
}
