"use client";

import Image from "next/image";
import { useState } from "react";
import type { Messages } from "@/lib/i18n";
import type { UnitMedia } from "@/types/experience";

export function UnitConceptImage({ item, messages, detail = false }: {
  item: UnitMedia; messages: Messages; detail?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const copy = messages.experience.media;
  const room = copy.labels[item.labelKey as keyof typeof copy.labels];
  return <figure className={`unit-concept-image${detail ? " unit-concept-image--detail" : ""}`}>
    {failed ? <p role="status">{copy.mediaUnavailable}</p> : <Image
      src={item.src}
      alt={copy.illustrationAlt.replace("{room}", room)}
      fill
      sizes={detail ? "(max-width: 760px) 90vw, (max-width: 1400px) 88vw, 1200px" : "(max-width: 760px) 92vw, 45vw"}
      onError={() => setFailed(true)}
    />}
    <figcaption>{copy.illustrationLabel}</figcaption>
  </figure>;
}
