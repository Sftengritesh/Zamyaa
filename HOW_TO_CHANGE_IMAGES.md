# ZAMYAA BY JYOTI — Collections, Categories & Image Guide

This document is your single reference for managing your client's collections, categories, and photos.

---

## 🌸 1. Your Client's Collections (7 Active + 2 Old)

### Active Collections (Currently in Season):
1. **Neel Pushp** (`/collections/neel-pushp`) — Indigo Blooms & Midnight Silks
2. **Sunehri Dhoop** (`/collections/sunehri-dhoop`) — Golden Sunrays & Warm Metallics
3. **Desi Dastaan** (`/collections/desi-dastaan`) — Tales of Indian Heirlooms
4. **Noor-e-Rang** (`/collections/noor-e-rang`) — Luminous Hues of Rajasthan
5. **The Boho Flare Affair** (`/collections/the-boho-flare-affair`) — Free-Spirited Drapes & Organza
6. **Lantana** (`/collections/lantana`) — An Architecture of Bloom (Soft Hues)
7. **Zarrin** (`/collections/zarrin`) — Molten Gold & Evening Opulence

### Old Collections (Archival / Vault):
8. **Gulabi Noor** (`/collections/gulabi-noor`) — Archival Rose Edition
9. **Neel-o-Mitti** (`/collections/neel-o-mitti`) — Raw Earth & Indigo Dyes

---

## 👗 2. The Only Two Allowed Categories

Everything else has been removed from the site filters, navigation, and admin panel:
1. **Farshi Suit-Set** (`farshi-suit-set`) — Long kurtis paired with sweeping wide farshi trousers and dupattas.
2. **Skirt Top** (`skirt-top`) — Flared silk/organza skirts paired with structured corsets and blouse tops.

---

## 🖼️ 3. Where Are the Photos Located & How to Change Them Later

All images on the website are referenced in **ONE central file**:
👉 [`src/config/images.ts`](file:///d:/Ritesh/project/zamyaa/src/config/images.ts)

### Option A: Change Links for Any Collection
Open [`src/config/images.ts`](file:///d:/Ritesh/project/zamyaa/src/config/images.ts):
```ts
export const siteImages = {
  collections: {
    neelPushp: {
      hero: 'YOUR_IMAGE_LINK_HERE',
      mosaic: ['IMAGE_1', 'IMAGE_2', 'IMAGE_3'],
    },
    sunehriDhoop: {
      hero: 'YOUR_IMAGE_LINK_HERE',
      mosaic: ['IMAGE_1', 'IMAGE_2', 'IMAGE_3'],
    },
    desiDastaan: { ... },
    noorERang: { ... },
    theBohoFlareAffair: { ... },
    lantana: { ... },
    zarrin: { ... },
    gulabiNoor: { ... },
    neelOMitti: { ... }
  }
}
```

### Option B: Change Category Photos
In [`src/config/images.ts`](file:///d:/Ritesh/project/zamyaa/src/config/images.ts):
```ts
  categories: {
    farshiSuitSet: 'PASTE_FARSHI_IMAGE_URL_OR_PATH',
    skirtTop: 'PASTE_SKIRT_TOP_IMAGE_URL_OR_PATH',
  }
```

### Option C: Drop Images Directly into `public/images/models/`
You can drop photos directly into your workspace folder:
```
d:\Ritesh\project\zamyaa\public\images\models\
├── lantana-hero-models.jpg   ← (Photo 1: The two girls standing)
├── lantana-detail-hues.jpg   ← (Photo 2: Scalloped lace closeup)
└── lantana-shoot-grid.jpg    ← (Photo 3: 30-shot photoshoot grid)
```
Replacing these 3 files immediately changes the entire site without writing a single line of code!

### Option D: Add Clothes from the Admin Portal (For Jyoti)
1. Go to `http://localhost:5173/admin/products/new`
2. Select your client's **Collection** (e.g. *Neel Pushp*, *Sunehri Dhoop*, *Lantana*, etc.)
3. Select your client's **Category** (either *Farshi Suit-Set* or *Skirt Top*)
4. Upload photos directly via Cloudinary or paste image links
5. Click **Publish Product** — It immediately appears on the customer storefront!
