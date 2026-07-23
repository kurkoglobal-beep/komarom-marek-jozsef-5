# Projektarchitektúra

## Jelenlegi réteg

A Sprint 1 egyetlen publikus Next.js landing oldalt tartalmaz. Nem használ adatbázist, autentikációt vagy külső API-t.

## Tervezett rétegek

- `app/`: route-ok és oldalszintű komponensek
- `components/`: újrafelhasználható UI-elemek
- `lib/`: külső szolgáltatások és alkalmazásszintű segédfüggvények
- `types/`: megosztott adatmodellek
- `hooks/`: kliensoldali állapotkezelési hookok
- `supabase/`: verziózott migrációk és adatbázis-dokumentáció

## Integrációs elvek

- A landing page vizuális rétege maradjon független az adatforrástól.
- Környezeti kulcs nem kerülhet a repository-ba.
- Minden Supabase-tábla kapjon Row Level Security szabályokat.
- Az érdeklődői űrlap szerveroldali validációval és visszaélés-védelemmel köthető be.
- Az adminfunkciók külön, védett route-csoportba kerüljenek.

## Deployment

- A standard Next.js build a Vercelhez használható.
- A vinext build a jelenlegi Sites-kompatibilitást őrzi.
- A két deployment-cél környezeti változóit külön kell kezelni.
