export const salesNavigation = [
  { href: "/", labelKey: "home", icon: "⌂" },
  { href: "/masterplan", labelKey: "masterplan", icon: "◇" },
  { href: "/lakasok", labelKey: "apartments", icon: "▦" },
  { href: "/kedvencek", labelKey: "favorites", icon: "♡" },
  { href: "/kapcsolat", labelKey: "contact", icon: "✉" },
] as const;

export function isSalesRouteActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
