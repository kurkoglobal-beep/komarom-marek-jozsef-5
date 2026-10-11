"use client";

import { useEffect } from "react";

const PROJECT_CACHE_PREFIX = "kmj5-";

export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV !== "production") {
      void navigator.serviceWorker
        .getRegistrations()
        .then((registrations) =>
          Promise.all(registrations.map((registration) => registration.unregister())),
        )
        .catch(() => undefined);

      if ("caches" in window) {
        void caches
          .keys()
          .then((keys) =>
            Promise.all(
              keys
                .filter((key) => key.startsWith(PROJECT_CACHE_PREFIX))
                .map((key) => caches.delete(key)),
            ),
          )
          .catch(() => undefined);
      }

      return;
    }

    void navigator.serviceWorker.register("/sw.js").catch(() => undefined);
  }, []);

  return null;
}
