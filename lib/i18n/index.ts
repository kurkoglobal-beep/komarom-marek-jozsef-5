import deContent from "@/content/marek5/de.json";
import enContent from "@/content/marek5/en.json";
import huContent from "@/content/marek5/hu.json";
import skContent from "@/content/marek5/sk.json";
import deMessages from "@/i18n/messages/de.json";
import enMessages from "@/i18n/messages/en.json";
import huMessages from "@/i18n/messages/hu.json";
import skMessages from "@/i18n/messages/sk.json";

export const supportedLocales = ["hu", "en", "sk", "de"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];
export const defaultLocale: SupportedLocale = "hu";

export type Messages = typeof huMessages;
export type Marek5Content = typeof huContent;

const messagesByLocale: Record<SupportedLocale, Messages> = {
  hu: huMessages,
  en: enMessages as unknown as Messages,
  sk: skMessages as unknown as Messages,
  de: deMessages as unknown as Messages,
};

const projectContentByLocale = {
  hu: huContent,
  en: enContent,
  sk: skContent,
  de: deContent,
};

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return supportedLocales.includes(locale as SupportedLocale);
}

export function getTranslations(locale: string = defaultLocale): {
  locale: SupportedLocale;
  messages: Messages;
  content: Marek5Content;
} {
  const selectedLocale = isSupportedLocale(locale) ? locale : defaultLocale;
  const localizedContent = projectContentByLocale[selectedLocale];
  const content =
    "_meta" in localizedContent &&
    localizedContent._meta.translationStatus === "fallback"
      ? huContent
      : (localizedContent as Marek5Content);

  return {
    locale: selectedLocale,
    messages: messagesByLocale[selectedLocale],
    content,
  };
}

export function interpolate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? `{${key}}`);
}
