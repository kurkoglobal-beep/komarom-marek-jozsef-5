# Digital Sales OS — Platform Core Entities

Ez a dokumentum a Digital Sales OS globális core entitásainak egyetlen forrásigazsága. A Masterplan, Lakás Explorer, Foglalás, Szerződés és Ügyfélportál modulok ezeket az entitásokat nem definiálhatják újra; kizárólag kompatibilis mezőkkel és moduláris szabályokkal bővíthetik.

## Platformszabályok

1. Minden entitás kötelező mezői: `id`, `createdAt`, `updatedAt`.
2. Minden hivatkozott entitást legalább stub szinten definiálni kell.
3. Meglévő core entitást új modul nem definiálhat újra.
4. A `Unit.availabilityStatus` nem önálló üzleti forrásigazság.
5. A lakás elérhetősége a `Reservation`, `Contract`, `AdminLock` és az értékesítési szabályok állapotából deriválandó.
6. A core entitások platformszintűek; a Marek5-specifikus tartalom külön projekt-override rétegbe tartozik.
7. A későbbi Supabase-megvalósításban az adatbázis `snake_case`, a TypeScript-réteg `camelCase` elnevezést használhat, de a mappingnek explicitnek és tesztelhetőnek kell lennie.
8. Minden időbélyeg ISO 8601 / UTC formátumú.
9. A státuszmezők dokumentált enumértékeket használnak, nem szabad szöveget.
10. Pénzügyi érték nem tárolható lebegőpontos számban; minden összeg integer minor unit formában tárolandó.

## Közös típusok

```ts
type EntityId = string;
type IsoUtcDateTime = string;
type CurrencyCode = string; // ISO 4217
type LanguageCode = string; // BCP 47
type MoneyAmount = number;   // integer minor unit; lebegőpontos érték nem megengedett
type AssetMetadata = Record<string, unknown>;
type Position = { x: number; y: number; z?: number };
```

## Core entitások

### Project

```ts
Project {
  id: EntityId
  name: string
  slug: string
  city: string
  countryCode: string
  description: string | null
  status: "draft" | "active" | "paused" | "completed" | "archived"
  defaultCurrency: CurrencyCode
  defaultLanguage: LanguageCode
  createdAt: IsoUtcDateTime
  updatedAt: IsoUtcDateTime
}
```

### Building

```ts
Building {
  id: EntityId
  projectId: EntityId
  name: string
  code: string
  description: string | null
  displayOrder: number
  floorCount: number
  unitCount: number
  status: "planned" | "active" | "completed" | "inactive"
  createdAt: IsoUtcDateTime
  updatedAt: IsoUtcDateTime
}
```

### Floor

```ts
Floor {
  id: EntityId
  buildingId: EntityId
  level: number
  name: string
  displayOrder: number
  createdAt: IsoUtcDateTime
  updatedAt: IsoUtcDateTime
}
```

### UnitType

A `UnitType` projekthez tartozó sablonentitás. Több konkrét `Unit` hivatkozhat rá; a virtuális séta és a 3D-modell alapértelmezetten itt kapcsolódik, nem lakásonként külön.

```ts
UnitType {
  id: EntityId
  projectId: EntityId
  name: string
  code: string
  roomCount: number
  templateFloorPlanAssetId: EntityId | null
  templateVirtualTourAssetId: EntityId | null
  template3DAssetId: EntityId | null
  createdAt: IsoUtcDateTime
  updatedAt: IsoUtcDateTime
}
```

### Unit

```ts
Unit {
  id: EntityId
  floorId: EntityId
  unitTypeId: EntityId
  unitNumber: string
  roomCount: number
  interiorArea: string
  terraceArea: string | null
  gardenArea: string | null
  orientations: string[]
  viewType: string | null
  availabilityStatus:
    | "coming_soon"
    | "available"
    | "temporarily_reserved"
    | "reserved"
    | "sold"
    | "not_for_sale"
  basePriceAmount: MoneyAmount | null
  calculatedPriceAmount: MoneyAmount | null
  currency: CurrencyCode
  parkingIncluded: boolean
  storageIncluded: boolean
  floorPlanAssetId: EntityId | null
  createdAt: IsoUtcDateTime
  updatedAt: IsoUtcDateTime
}
```

`availabilityStatus` kizárólag derivált vagy cache-elt érték. Nem ez az üzleti forrásigazság; a végleges állapotot aktív `Reservation`, aláírt `Contract`, aktív `AdminLock` és az értékesítési szabályok alapján kell számítani.

Az elérhetőségi értékek közül:

- `temporarily_reserved`: rövid időtartamú technikai vagy értékesítői zárolás; folyamatban lévő foglaláshoz vagy jóváhagyáshoz kapcsolódik, és automatikusan lejárhat.
- `reserved`: üzletileg elfogadott, aktív foglalás; ellenőrzött ügyfélhez kapcsolódik, és kizárólag lejárással, törléssel vagy szerződéssé alakítással szűnik meg.

A `Reservation` saját életciklusa és a `Unit` derivált elérhetősége külön kezelendő. A foglalás státusza üzleti tény, az elérhetőségi állapot ennek és a többi forrásigazságnak a számított vetülete.

### Customer

```ts
Customer {
  id: EntityId
  firstName: string
  lastName: string
  email: string
  phone: string | null
  preferredLanguage: LanguageCode
  portalStatus: "invited" | "active" | "suspended" | "disabled"
  createdAt: IsoUtcDateTime
  updatedAt: IsoUtcDateTime
}
```

A `Customer` az első verzióban külön üzleti entitás; nem szükséges `User` rekordként is kezelni.

### User

Minimális platformfelhasználó a `salesAgentId` és `lockedByUserId` hivatkozásokhoz.

```ts
User {
  id: EntityId
  name: string
  email: string
  role: "admin" | "project_manager" | "sales_agent" | "customer_support"
  status: "invited" | "active" | "suspended" | "disabled"
  createdAt: IsoUtcDateTime
  updatedAt: IsoUtcDateTime
}
```

### Reservation

```ts
Reservation {
  id: EntityId
  unitId: EntityId
  customerId: EntityId
  salesAgentId: EntityId
  status: "pending" | "active" | "expired" | "cancelled" | "converted_to_contract"
  reservedAt: IsoUtcDateTime | null
  expiresAt: IsoUtcDateTime | null
  cancelledAt: IsoUtcDateTime | null
  createdAt: IsoUtcDateTime
  updatedAt: IsoUtcDateTime
}
```

### Contract

A `Contract` kötelező core entitás: összeköti a foglalási életciklust az ügyfélportállal és a végleges értékesítési állapottal.

```ts
Contract {
  id: EntityId
  reservationId?: EntityId | null
  unitId: EntityId
  customerId: EntityId
  status:
    | "draft"
    | "under_review"
    | "ready_for_signature"
    | "partially_signed"
    | "signed"
    | "cancelled"
    | "terminated"
  signedAt: IsoUtcDateTime | null
  documentAssetId: EntityId | null
  createdAt: IsoUtcDateTime
  updatedAt: IsoUtcDateTime
}
```

Közvetlen szerződéskötés foglalás nélkül is megengedett, ezért a `reservationId` opcionális. A `unitId` és a `customerId` minden szerződésnél kötelező, így a szerződés foglalás hiányában is egyértelműen kapcsolódik a lakáshoz és az ügyfélhez.

### Amenity

```ts
Amenity {
  id: EntityId
  projectId: EntityId
  type: string
  name: string
  position: Position | null
  iconAssetId: EntityId | null
  createdAt: IsoUtcDateTime
  updatedAt: IsoUtcDateTime
}
```

### Asset

Az `Asset` a meglévő Asset Library és DAM-rendszer platformszintű megfelelője. A `version`, `filename`, kategória és tárolási hely a `assets/asset-library.json` logikájával összhangban kezelendő; az adatbázis később nem helyettesíti a verziózott fájl- és storage-szabályokat.

```ts
Asset {
  id: EntityId
  projectId: EntityId
  type: string
  category: string
  version: string
  filename: string
  storagePath: string
  mimeType: string
  metadata: AssetMetadata
  createdAt: IsoUtcDateTime
  updatedAt: IsoUtcDateTime
}
```

### AdminLock

```ts
AdminLock {
  id: EntityId
  unitId: EntityId
  reason: string
  status: "active" | "released" | "expired"
  lockedByUserId: EntityId
  lockedAt: IsoUtcDateTime
  expiresAt: IsoUtcDateTime | null
  createdAt: IsoUtcDateTime
  updatedAt: IsoUtcDateTime
}
```

## Entitáskapcsolatok

```text
Project
├── Building
│   └── Floor
│       └── Unit
│           ├── Reservation
│           │   └── Contract
│           ├── AdminLock
│           └── UnitType
├── Amenity
└── Asset

Customer
├── Reservation
└── Contract

User
├── Reservation.salesAgentId
└── AdminLock.lockedByUserId
```

A diagramon a `UnitType` a `Unit` hivatkozási céljaként jelenik meg, de tulajdonjog szerint projektszintű sablonentitás: egy `Project` több `UnitType` rekordot tartalmazhat, és egy `UnitType` több `Unit` rekordhoz kapcsolódhat.

## Forrásigazság és állapotderiválás

- A `Reservation` és a `Contract` egymástól elkülönülő életciklussal rendelkezik.
- A `Unit` elérhetősége a két életciklusból, az `AdminLock` állapotából és az értékesítési szabályokból számítandó.
- Lejárt vagy törölt `Reservation` nem tarthatja foglaltnak a `Unit` rekordot.
- Aláírt `Contract` esetén az eredmény `sold`.
- Folyamatban lévő vagy jóváhagyásra váró foglalási folyamat esetén az eredmény `temporarily_reserved`.
- Üzletileg elfogadott, aktív `Reservation` esetén az eredmény `reserved`.
- Aktív `AdminLock` esetén az eredmény `not_for_sale` lehet.
- Az állapotfrissítés később tranzakcióban vagy szerveroldali üzleti logikával történjen, ne kliensoldali kézi szinkronizálással.

```ts
deriveUnitAvailability(unitId) {
  if (hasSignedContract(unitId)) return "sold"
  if (hasActiveAdminLock(unitId)) return "not_for_sale"
  if (hasAcceptedReservation(unitId)) return "reserved"
  if (hasPendingReservationProcess(unitId)) return "temporarily_reserved"
  if (isComingSoon(unitId)) return "coming_soon"
  return "available"
}
```

## Árkezelési megjegyzés

A `basePriceAmount`, `calculatedPriceAmount` és `currency` csak a minimális core séma része.

- Lebegőpontos szám pénz tárolására nem használható.
- Az összeg egész számként, a pénznem legkisebb egységében tárolandó.
- HUF esetében az összeg forintban, EUR esetében centben értendő.
- Minden pénzösszeghez kötelező ISO 4217 pénznemkód tartozik.
- A pénzösszeg lokalizált formázása a megjelenítési réteg feladata.

A későbbi árazási réteg külön szabályokkal vagy entitásokkal bővíthető, például:

- floor premium
- orientation premium
- view premium
- terrace premium
- parking
- storage
- campaign discount
- currency conversion

A `calculatedPriceAmount` lehet cache-elt eredmény, de a verziózott árazási szabályok jelentik a valódi forrásigazságot.

## Enum Governance

- Meglévő enumérték jelentése visszamenőlegesen nem módosítható.
- Új enumérték csak dokumentált üzleti indokkal adható hozzá.
- Törlés helyett `deprecated` állapot és dokumentált kivezetési folyamat használatos.
- Az adatbázis-, TypeScript- és API-réteg ugyanazokat a kanonikus enumértékeket használja.
- Enumváltozáskor sémaverzió-emelés és kompatibilitási ellenőrzés szükséges.

## Projekt-override

- A core entitások nem tartalmazhatnak projekt-specifikus épületneveket vagy konkrét lakásadatokat.
- A Marek5 külön seed/adatfájlban vagy projektkonfigurációban használja a core modellt.
- Győr, Tata, Pozsony vagy más projekt ugyanazt a core sémát használhatja.
- A nyelv és a pénznem projektszinten konfigurálható.
- Projekt-override bővíthet, de core mezőt, kapcsolatot vagy forrásigazságot nem definiálhat újra.
