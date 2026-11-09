/**
 * ============================================================================
 * ZAMYAA BY JYOTI — CENTRALIZED IMAGE ASSET CONFIGURATION
 * ============================================================================
 * 
 * To change ANY photo on the entire website:
 * 1. OPTION A (Easiest): Replace the file inside `public/images/models/` with your new image.
 * 2. OPTION B: Simply paste your new image URL or path in this file below!
 * 
 * All pages (Homepage 3D Hero, Collections, Product Pages, Lookbooks) automatically update.
 */

export const siteImages = {
  // ── 3D MODEL & HERO GIRLS (The 3 Photos from Atelier Shoot) ──
  models: {
    // 1. Two models in lilac & yellow salwar suits ("Timeless Elegance")
    heroGirls: '/images/models/lantana-hero-models.jpg',
    
    // 2. Close-up detail of scalloped French lace hem & pleated salwar ("Soft Hues")
    detailHues: '/images/models/lantana-detail-hues.jpg',
    
    // 3. 32-shot garden photoshoot contact sheet & moodboard
    shootGrid: '/images/models/lantana-shoot-grid.jpg',
  },

  // ── HOMEPAGE HERO & CAMPAIGN ──
  homepage: {
    // 3D Model primary texture
    hero3DModel: '/images/models/lantana-hero-models.jpg',
    hero3DDetail: '/images/models/lantana-detail-hues.jpg',
    hero3DLookbook: '/images/models/lantana-shoot-grid.jpg',
    
    // Fallback static banner
    heroBanner: '/images/models/lantana-hero-models.jpg',
    
    // Editorial Feature Banner
    editorialFeature: '/images/models/lantana-shoot-grid.jpg',
  },

  // ── SIGNATURE COLLECTIONS ──
  collections: {
    lantana: {
      hero: '/images/models/lantana-hero-models.jpg',
      mosaic: [
        '/images/models/lantana-hero-models.jpg',
        '/images/models/lantana-detail-hues.jpg',
        '/images/models/lantana-shoot-grid.jpg',
      ],
      banner: '/images/models/lantana-shoot-grid.jpg',
    },
    noorERang: {
      hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfuxqZf27ins7Kdr765TAwhjxQcguh3iNl59grkP5K9Gm6ugHPnQeUaR0ZO38jDgoi1-52lBXqSe3c3u3kTnaMJ3qJi0EDLh1IzOAyPMY2CqV9pPPGyTcfsp7pfAtAGMMludLl0T1Mu72m9k795LFl7yUJywYNhH1t1RFZeSn-uzeTD0eL67QW1dodLgtFfwpxiZHHwFZs72NVMU7QB-Pyey6qCv987D63rg2O5303',
      mosaic: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBfuxqZf27ins7Kdr765TAwhjxQcguh3iNl59grkP5K9Gm6ugHPnQeUaR0ZO38jDgoi1-52lBXqSe3c3u3kTnaMJ3qJi0EDLh1IzOAyPMY2CqV9pPPGyTcfsp7pfAtAGMMludLl0T1Mu72m9k795LFl7yUJywYNhH1t1RFZeSn-uzeTD0eL67QW1dodLgtFfwpxiZHHwFZs72NVMU7QB-Pyey6qCv987D63rg2O5303',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAzKmtPeQxvihoBt9gfOniLLCFGYEdkatPLmxHfqY6cxbnStaW3uBoc1xvoOwUJphZByozEIUf5_wAlVnU_9vmhBSh92BcA3EcQ-R68bX6cIezwp3GAg0XagObxmUl3yWE9vUvPFptpiniX8cu6WDgn8dUXF6rdTf_WF_S-mCvV_pWyg5BNZKhiAeRfhDJwYSd25jinnaZ93IwZTV66AiIHSFdbr9yTCW6IckBBuIgC',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDtLuotM2i_ew3uFqc3FH8mq2VZVDi5lWNLvl65cN0LRYXP1i_3kJqwzAqmxF2OZhI1A9V5bwkRPtCRIJsO4mJsHlqQDyK2vd1vNzpAdmJM7GfgRbD7dGFcPWBBDAP1LBNYbWfH7BXFmqLQG1-WekN4mWFMRwAZH8aVCagHEBJqVvGiyxpfIDt8e3Pd0PxAJKz6a1d9i8LgtDkXC9jcobsuIueDuS4GpIJLpz4FA',
      ],
    },
  },
} as const
