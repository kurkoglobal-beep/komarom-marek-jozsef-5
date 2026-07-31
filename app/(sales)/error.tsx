"use client";

export default function SalesError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <section className="sales-feedback error" role="alert"><span aria-hidden="true">!</span><h1>Az oldal most nem tölthető be</h1><p>Kérjük, próbálja újra. Ha a probléma továbbra is fennáll, munkatársaink készséggel segítenek.</p><button className="button dark" type="button" onClick={reset}>Újrapróbálom</button></section>;
}
