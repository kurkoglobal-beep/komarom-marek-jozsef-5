# Komárom – Marek József utca 5.

Prémium ingatlanfejlesztési landing page a komáromi Marek József utca 5. projekthez. A jelenlegi verzió piaci validációs felület; úgy van felépítve, hogy később teljes értékesítési platformmá bővíthető legyen.

## Projektállapot

- Sprint 1: prémium, reszponzív landing page elkészült
- Sprint 2: projekt-infrastruktúra és dokumentáció elkészült
- Supabase: előkészítve, de nincs csatlakoztatva
- Git: inicializálva
- Produkciós build: ellenőrzött

## Technológia

- Next.js 16, App Router
- React 19
- TypeScript, szigorú típusellenőrzéssel
- Tailwind CSS 4
- pnpm
- vinext/Sites kompatibilis build
- Vercel-kompatibilis Next.js build
- Supabase-re előkészített konfiguráció

## Követelmények

- Node.js 22.13 vagy újabb
- pnpm 11 vagy újabb

## Helyi fejlesztés

```bash
pnpm install
pnpm dev
```

A fejlesztői oldal alapértelmezetten a `http://localhost:3000` címen indul.

Standard Next.js fejlesztői környezethez:

```bash
pnpm dev:next
```

## Ellenőrzések

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

Vercel-kompatibilis Next.js build:

```bash
pnpm build:vercel
```

## Környezeti változók

Másolja le a példafájlt:

```bash
cp .env.example .env.local
```

Előkészített változók:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

A mezők szándékosan üresek. A projekt jelenleg nem kapcsolódik Supabase-projekthez, és nem végez adatbázis-műveleteket.

## Könyvtárstruktúra

```text
app/                  Next.js route-ok, layout és a jelenlegi landing page
components/           Újrafelhasználható UI-komponensek
docs/                 Projekt- és architektúra-dokumentáció
hooks/                Kliensoldali React hookok
lib/                  Integrációk és megosztott segédfüggvények
  supabase/            Supabase konfigurációs váz
public/
  icons/               Statikus ikonok
  images/              Általános képi tartalmak
  komarom/             A landing page jelenlegi látványtervei
styles/                Későbbi megosztott stílusmodulok
supabase/
  migrations/          Későbbi adatbázis-migrációk
types/                 Megosztott TypeScript-típusok
tests/                 Automatizált ellenőrzések
```

Az üres, jövőbeli mappák `.gitkeep` fájlt tartalmaznak, hogy Gitben is megmaradjanak.

## Supabase előkészítés

A `lib/supabase/config.ts` kizárólag a környezeti változók biztonságos kiolvasására szolgál. Supabase kliens, adatbázis-kapcsolat, autentikáció vagy migráció jelenleg nincs aktiválva.

A tényleges integráció előtt:

1. létre kell hozni egy külön Supabase-projektet;
2. be kell állítani a helyi és hosztolt környezeti változókat;
3. meg kell tervezni a lead/adatkezelési sémát;
4. létre kell hozni az RLS-szabályokat;
5. csak ezután szabad bekötni az érdeklődői űrlapot.

## GitHub

A repository GitHub-ra feltölthető. Javasolt lépések:

1. hozzon létre egy üres `komarom-marek-jozsef-5` repository-t;
2. állítsa be `origin` remote-ként;
3. tolja fel a `main` branchet;
4. kapcsolja be a branch protectiont és a pull request alapú fejlesztést;
5. állítsa be a szükséges GitHub Actions ellenőrzéseket.

Titkos kulcsot vagy `.env.local` fájlt tilos commitolni.

## Vercel

Vercel telepítéshez importálja a GitHub repository-t, válassza a Next.js frameworköt, és használja:

- Build command: `pnpm build:vercel`
- Install command: `pnpm install --frozen-lockfile`
- Node.js: 22.x

A Supabase környezeti változókat csak a tényleges Supabase-projekt létrehozása után kell beállítani.

## Későbbi bővítési irányok

- Supabase-alapú érdeklődőkezelés
- lakásválasztó és készletkezelés
- 3D modul és virtuális séta
- online foglalás
- befektetői modul
- admin felület

Ezek nem részei a jelenlegi sprintnek.

## Licenc és tartalom

A projekt képei jelenleg vizuális referencia- és validációs anyagok. Éles értékesítési használat előtt ellenőrizni kell a végleges képek, logók, szövegek és jogi dokumentumok felhasználási jogosultságát.
