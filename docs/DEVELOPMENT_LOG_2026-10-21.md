# MAREK 5 — Fejlesztési napló, 2026. október 21.

Repository: `kurkoglobal-beep/komarom-marek-jozsef-5`
Fejlesztési ág: `codex/marek5-apartment-finder-v2-20261021`

## Elkészült

- **Lakáskiválasztó 2.1:** a technikai URL-lekérdezés eltávolítása a találati fejlécből; a négy szűrő, az idegen URL-paraméterek és a hash megőrzése. A Törlés gomb legalább 44 × 44 px érintési területet kapott. Mentett commit: `d5ded97855f0455eed306f549bc741db76391d2b`.
- **Lakáskiválasztó 2.2:** a kereső, a kedvencek és az adatlapok meglévő koncepcióképekkel bővültek. Öt kompakt mintalakás a meglévő nappali-étkező illusztrációt, hat családi mintalakás az enteriőr-összeállítást használja. Az A-2.01 eredeti alaprajza, axonometriája és enteriőrjei megmaradtak.
- A koncepcióképek és az adatlapok kötelező tájékoztató feliratot kaptak, HU/EN/DE/SK szövegekkel és képleírásokkal. Az újrafelhasználás az Asset Library katalógusában szerepel.
- Új kép nem készült; meglévő képfájl nem változott. A képek Next/Image használatával, reszponzív méretezéssel és késleltetett betöltéssel jelennek meg.
- A jóváhagyott főoldal nem kapcsolja be az új koncepcióképeket. A 2D Masterplan és a projektvideók nem változtak. A tesztlakások árai és alapterületei továbbra is semleges, előkészítés alatti jelölést kapnak.

## Ellenőrzések

- `pnpm typecheck`: sikeres.
- `pnpm lint`: sikeres, 0 hiba; 3 meglévő főoldali `no-img-element` figyelmeztetés.
- `pnpm i18n:validate`: sikeres, 4 nyelv, 295 UI-kulcs.
- `pnpm assets:validate`: sikeres, 54 katalógusbejegyzés, 119 fájl.
- `pnpm build`: sikeres, 22 generált oldal.
- Meglévő HTTP smoke tesztek: 6/6 sikeres a helyi fejlesztői szerveren.
- `node --test tests/apartment-media.test.mjs`: 3/3 sikeres a production build HTML-fájljain; mind a 12 kártya és adatlap, az A-2.01 médiavédelme és a főoldal elkülönítése ellenőrizve.
- `git diff --check`: sikeres.
- A 2.1 felületét 390 × 844 és 1440 × 1000 méreten ellenőriztük. A 2.2 teljes böngészős vizuális QA-ja még nyitott, mert a böngészőeszköz biztonsági szabálya megtagadta az előnézet elérését. A felhasználó később asztali képernyőképet biztosított; ez nem helyettesíti a teljes reszponzív ellenőrzést.
- A 3000-es porton futó PID 39504 munkakönyvtára és Next.js-folyamata a MAREK 5 projekthez tartozik. A szervert nem állítottuk le, nem indítottuk újra, konfigurációját nem módosítottuk.

## Következő feladat — csak dokumentálva

A lakáskártyák képeinek egységesítése:

1. Azonos képarány és megjelenítési méret.
2. Egységes igazítás és belső térközök.
3. Egységes illusztrációs felirat és feliratelhelyezés, a média eredetének megőrzésével.
4. Mobil- és asztali vizuális QA: olvashatóság, képtorzulás, túlcsordulás, érintési felületek és képbetöltés.
5. Az A-2.01 eredeti hozzárendelésének, a főoldalnak, a Masterplannak és a videóknak a további védelme.

Az egységesítés ebben a mentési körben nem készült el; további alkalmazáskód-módosítás nem történt.

## Mentési hatókör

A felhasználó a 2.2 elkészült módosításainak és ennek a naplónak a commitolását és a meglévő fejlesztési ágra történő feltöltését engedélyezte. Commitüzenet: `feat: add apartment concept imagery to finder 2.2`.

A `main` ág módosítása, merge és Production-telepítés nem része a mentésnek. Vercel-konfigurációt nem módosítunk és telepítési parancsot nem futtatunk. A teljes vizuális QA lezárása továbbra is külön feladat.
