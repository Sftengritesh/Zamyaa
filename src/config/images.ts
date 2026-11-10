/**
 * ============================================================================
 * ZAMYAA BY JYOTI — CENTRALIZED IMAGE ASSET CONFIGURATION
 * ============================================================================
 * 
 * TO CHANGE ANY PHOTO ON THE ENTIRE WEBSITE:
 * 1. OPTION A: Replace images inside `public/images/models/` or add new images to `public/images/`.
 * 2. OPTION B: Simply paste your new Cloudinary or local image URL directly into this file!
 * 
 * All pages (Homepage 3D Hero, Collections, Product Pages, Lookbooks) automatically update.
 */

// Common photos
const defaultHero = '/images/lantana/IMG_6642.jpeg'
const defaultDetail = '/images/lantana/IMG_6646.jpeg'
const defaultShootGrid = '/images/lantana/IMG_6644.jpeg'

export const siteImages = {
  // ── 3D MODEL & HERO GIRLS (From Atelier Shoot) ──
  models: {
    // 1. Two models in pastel salwar suits ("For the girls who love timeless elegance")
    heroGirls: defaultHero,
    // 2. Scalloped French lace hem & pleated salwar closeup ("Soft hues")
    detailHues: defaultDetail,
    // 3. Garden photoshoot 30-shot contact sheet & moodboard
    shootGrid: defaultShootGrid,
  },

  // ── HOMEPAGE HERO & 3D MODEL ──
  homepage: {
    hero3DModel: defaultHero,
    hero3DDetail: defaultDetail,
    hero3DLookbook: defaultShootGrid,
    heroBanner: defaultHero,
    editorialFeature: defaultShootGrid,
  },

  // ── THE TWO EXCLUSIVE CATEGORIES ──
  categories: {
    // 1. Farshi Suit-Set
    farshiSuitSet: defaultHero,
    // 2. Skirt Top
    skirtTop: '/images/the-boho-flare-affair/IMG_6681.jpeg',
  },

  // ── SIGNATURE COLLECTIONS (7 Active + 2 Old) ──
  collections: {
    // 1. Neel Pushp
    neelPushp: {
      hero: defaultHero,
      mosaic: [defaultHero, defaultDetail, defaultShootGrid],
    },

    // 2. Sunehri Dhoop
    sunehriDhoop: {
      hero: defaultDetail,
      mosaic: [defaultDetail, defaultHero, defaultShootGrid],
    },

    // 3. Desi Dastaan
    desiDastaan: {
      hero: 'https://res.cloudinary.com/c8deakbl/image/upload/v1794029107/zamyaa/products/kro6zhda0mlzo6qwdsvh.jpg',
      mosaic: [
        'https://res.cloudinary.com/c8deakbl/image/upload/v1794029107/zamyaa/products/kro6zhda0mlzo6qwdsvh.jpg',
        defaultDetail,
        defaultShootGrid,
      ],
    },

    // 4. Noor-e-Rang
    noorERang: {
      hero: 'https://res.cloudinary.com/c8deakbl/image/upload/v1794206193/zamyaa/products/sparyp1mwtrxd55gblqw.jpg',
      mosaic: [
        'https://res.cloudinary.com/c8deakbl/image/upload/v1794206193/zamyaa/products/sparyp1mwtrxd55gblqw.jpg',
        'https://res.cloudinary.com/c8deakbl/image/upload/v1794206160/zamyaa/products/zttifqb0fl5pjvz0q5x8.jpg',
        defaultShootGrid,
      ],
    },

    // 5. The Boho Flare Affair
    theBohoFlareAffair: {
      hero: '/images/the-boho-flare-affair/IMG_6681.jpeg',
      mosaic: [
        '/images/the-boho-flare-affair/IMG_6681.jpeg',
        '/images/the-boho-flare-affair/IMG_6686.jpeg',
        '/images/the-boho-flare-affair/IMG_6680.jpeg',
      ],
    },

    // 6. Lantana
    lantana: {
      hero: defaultHero,
      mosaic: [defaultHero, defaultDetail, defaultShootGrid],
    },

    // 7. Zarrin
    zarrin: {
      hero: defaultDetail,
      mosaic: [defaultDetail, defaultHero, defaultShootGrid],
    },

    // ── OLD COLLECTIONS (ARCHIVE) ──
    // 8. Gulabi Noor (Old)
    gulabiNoor: {
      hero: 'https://res.cloudinary.com/c8deakbl/image/upload/v1794206193/zamyaa/products/sparyp1mwtrxd55gblqw.jpg',
      mosaic: [
        'https://res.cloudinary.com/c8deakbl/image/upload/v1794206193/zamyaa/products/sparyp1mwtrxd55gblqw.jpg',
        defaultDetail,
        defaultShootGrid,
      ],
    },

    // 9. Neel-o-Mitti (Old)
    neelOMitti: {
      hero: defaultHero,
      mosaic: [defaultHero, defaultDetail, defaultShootGrid],
    },
  },
} as const
