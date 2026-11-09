import type { Product, Collection } from '@/types'
import { siteImages } from '@/config/images'

// ── Image URLs from Stitch and Atelier Shoot ──
export const productImages = {
  gulabi: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBfuxqZf27ins7Kdr765TAwhjxQcguh3iNl59grkP5K9Gm6ugHPnQeUaR0ZO38jDgoi1-52lBXqSe3c3u3kTnaMJ3qJi0EDLh1IzOAyPMY2CqV9pPPGyTcfsp7pfAtAGMMludLl0T1Mu72m9k795LFl7yUJywYNhH1t1RFZeSn-uzeTD0eL67QW1dodLgtFfwpxiZHHwFZs72NVMU7QB-Pyey6qCv987D63rg2O5303',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAzKmtPeQxvihoBt9gfOniLLCFGYEdkatPLmxHfqY6cxbnStaW3uBoc1xvoOwUJphZByozEIUf5_wAlVnU_9vmhBSh92BcA3EcQ-R68bX6cIezwp3GAg0XagObxmUl3yWE9vUvPFptpiniX8cu6WDgn8dUXF6rdTf_WF_S-mCvV_pWyg5BNZKhiAeRfhDJwYSd25jinnaZ93IwZTV66AiIHSFdbr9yTCW6IckBBuIgC',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDtLuotM2i_ew3uFqc3FH8mq2VZVDi5lWNLvl65cN0LRYXP1i_3kJqwzAqmxF2OZhI1A9V5bwkRPtCRIJsO4mJsHlqQDyK2vd1vNzpAdmJM7GfgRbD7dGFcPWBBDAP1LBNYbWfH7BXFmqLQG1-WekN4mWFMRwAZH8aVCagHEBJqVvGiyxpfIDt8e3Pd0PxAJKz6a1d9i8LgtDkXC9jcobsuIueDuS4GpIJLpz4FA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCdF7HqcZiFZ0q2Ybz8iMZ-jVAJA15jgqYE4LwVVOv1R1FVOIrFCOaRIPBGIJR6p26kd-R5Lxv9T3bfmGQg5R5fqc5mVE2WV1Hy7gOvMFzq3wqiHVKqRnI3HopWuBJ7KbJl5a7jbHqD9KtPFyQpW3UqeXjXd3jPnA47e-BCBL6Zq9h6HkJZJhDL5wR0iVfDNfXt7kX_0xT7nB22Z2BtEjPuQN3T0bZQc5Pf7P3g',
  ],
  lantana: [
    siteImages.models.heroGirls,
    siteImages.models.detailHues,
    siteImages.models.shootGrid,
  ],
}

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'gulabi-rose-silk-co-ord',
    name: 'The Gulabi Rose Silk Co-Ord Set',
    subtitle: 'Noor-e-Rang Collection',
    price: 48500,
    originalPrice: 62000,
    currency: '₹',
    collection: 'Noor-e-Rang',
    collectionSlug: 'noor-e-rang',
    description:
      "An opulent co-ordinate set in hand-woven Chanderi silk, dyed in a rich Gulabi rose shade inspired by the rose gardens of Jaipur's Amber Fort. The asymmetric tunic features intricate antique gota patti embroidery along the hemline, while the wide-leg palazzo trousers flow with architectural grace. Each piece is a limited-edition creation made by master artisans in Rajasthan.",
    fabric: 'Hand-woven Chanderi Silk, 100% Mulberry. Lining: Pure cotton muslin.',
    care: [
      'Dry clean only',
      'Store in breathable muslin bag',
      'Keep away from direct sunlight',
      'Handle embroidery with care',
    ],
    images: productImages.gulabi.map((url, i) => ({
      url,
      alt: `Gulabi Rose Co-Ord - Look ${i + 1}`,
      isPrimary: i === 0,
    })),
    sizes: [
      { label: 'XS', available: true, measurements: 'Bust 32" / Waist 26"' },
      { label: 'S', available: true, measurements: 'Bust 34" / Waist 28"' },
      { label: 'M', available: true, measurements: 'Bust 36" / Waist 30"' },
      { label: 'L', available: false, measurements: 'Bust 38" / Waist 32"' },
      { label: 'XL', available: true, measurements: 'Bust 40" / Waist 34"' },
    ],
    colors: [
      { name: 'Gulabi Rose', hex: '#E8617A' },
      { name: 'Ivory Pearl', hex: '#F5F0E8' },
      { name: 'Midnight Navy', hex: '#1C2951' },
    ],
    tags: ['co-ord', 'silk', 'chanderi', 'gota-patti', 'rajasthan', 'limited-edition'],
    isLimitedEdition: true,
    limitedCount: 60,
    inStock: true,
    badge: 'Limited — 60 Pieces',
  },
  {
    id: 'p5',
    slug: 'lantana-lilac-salwar-suit',
    name: 'The Lantana Gul-e-Bahar Lilac Salwar Suit',
    subtitle: 'Lantana Pret — Soft Hues Edition',
    price: 34500,
    originalPrice: 42000,
    currency: '₹',
    collection: 'Lantana',
    collectionSlug: 'lantana',
    description:
      'For the girls who love timeless elegance. A lyrical symphony in pastel lilac, tailored in breathable handloom Chanderi silk with delicate gold floral buti motifs. Features artisanal scalloped cotton lace trims along the hemline and sleeve cuffs, paired with pale lemon-yellow pleated salwar pants and an airy dual-toned shaded ombre dupatta finished with handcrafted tassels.',
    fabric: 'Handloom Chanderi Silk Kurti, Pure Mul Cotton Salwar, Shaded Chiffon Dupatta with handmade thread tassels.',
    care: [
      'Dry clean only',
      'Store flat in pure muslin cover',
      'Steam iron with reverse protection',
      'Do not bleach',
    ],
    images: [
      {
        url: siteImages.models.heroGirls,
        alt: 'Lantana Lilac Salwar Suit - Full Look with Ombre Dupatta',
        isPrimary: true,
      },
      {
        url: siteImages.models.detailHues,
        alt: 'Lantana Lilac Salwar Suit - Scallop Lace Hem Detail & Soft Hues',
      },
      {
        url: siteImages.models.shootGrid,
        alt: 'Lantana Campaign Shoot Lookbook & Garden Editorial',
      },
    ],
    sizes: [
      { label: 'XS', available: true, measurements: 'Bust 32" / Waist 26"' },
      { label: 'S', available: true, measurements: 'Bust 34" / Waist 28"' },
      { label: 'M', available: true, measurements: 'Bust 36" / Waist 30"' },
      { label: 'L', available: true, measurements: 'Bust 38" / Waist 32"' },
      { label: 'XL', available: true, measurements: 'Bust 40" / Waist 34"' },
      { label: 'Custom', available: true, measurements: 'Tailored to client measurements' },
    ],
    colors: [
      { name: 'Lilac & Lemon Yellow', hex: '#D8B4E2' },
      { name: 'Blush Rose', hex: '#EAA9BA' },
    ],
    tags: ['salwar-suit', 'lantana', 'co-ord', 'chanderi', 'pastel', 'soft-hues', 'lace', 'dupatta'],
    isLimitedEdition: true,
    limitedCount: 45,
    inStock: true,
    badge: 'Signature Piece',
  },
  {
    id: 'p6',
    slug: 'lantana-citron-salwar-set',
    name: 'The Lantana Zari Citron Salwar Set',
    subtitle: 'Lantana Pret — Soft Hues Edition',
    price: 32000,
    originalPrice: 38000,
    currency: '₹',
    collection: 'Lantana',
    collectionSlug: 'lantana',
    description:
      'Understated luxury in delicate buttercup yellow. Crafted in pure handloom cotton-silk with a signature scalloped sweetheart neckline and delicate micro-pearl strap detailing. Accented with contrast lilac French lace at the hem and paired with pleated lilac salwar trousers and a matching shaded ombre dupatta.',
    fabric: 'Pure Handloom Cotton-Silk Tunic, Chanderi Pleated Salwar, Shaded Chiffon Dupatta.',
    care: [
      'Dry clean only',
      'Store in breathable cotton bag',
      'Low steam iron on reverse side',
    ],
    images: [
      {
        url: siteImages.models.detailHues,
        alt: 'Lantana Citron Salwar Set - Scallop Bodice & Floral Hues',
        isPrimary: true,
      },
      {
        url: siteImages.models.heroGirls,
        alt: 'Lantana Citron Salwar Set - Model View in Garden',
      },
      {
        url: siteImages.models.shootGrid,
        alt: 'Lantana Atelier Shoot Details & Flower Accents',
      },
    ],
    sizes: [
      { label: 'XS', available: true },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
      { label: 'Custom', available: true },
    ],
    colors: [
      { name: 'Citron Yellow & Lilac', hex: '#FFF4BD' },
      { name: 'Ivory Cream', hex: '#FAF6EE' },
    ],
    tags: ['salwar-suit', 'lantana', 'co-ord', 'cotton-silk', 'pastel', 'soft-hues', 'scallops', 'dupatta'],
    isLimitedEdition: false,
    inStock: true,
    badge: 'New Season',
  },
  {
    id: 'p2',
    slug: 'lantana-cape-dress',
    name: 'Lantana Embroidered Cape Dress',
    subtitle: 'Lantana Collection — AW2025',
    price: 56000,
    currency: '₹',
    collection: 'Lantana',
    collectionSlug: 'lantana',
    description:
      'An architectural masterpiece of contemporary Indian fashion. The Lantana Cape Dress features a sculptural cape overlay in handwoven Banarasi tissue silk, with delicate zardozi embellishments echoing the floral lantana motif. The inner slip dress is in pure Chanderi silk, ensuring an ethereal drape.',
    fabric: 'Cape: Handwoven Banarasi Tissue Silk. Inner: Pure Chanderi Silk.',
    care: ['Dry clean only', 'Handle embroidery with care', 'Store flat in muslin'],
    images: [
      {
        url: siteImages.models.shootGrid,
        alt: 'Lantana Cape Dress - Lookbook Montage',
        isPrimary: true,
      },
      {
        url: siteImages.models.heroGirls,
        alt: 'Lantana Cape Dress - Campaign Mood',
      },
      {
        url: siteImages.models.detailHues,
        alt: 'Lantana Cape Dress - Textile Craftsmanship',
      },
    ],
    sizes: [
      { label: 'XS', available: true },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: false },
    ],
    colors: [
      { name: 'Ivory Moonlight', hex: '#F8F3EA' },
      { name: 'Blush Dusk', hex: '#D4A5A5' },
      { name: 'Onyx', hex: '#1A1A1A' },
    ],
    tags: ['cape', 'dress', 'banarasi', 'zardozi', 'aw2025'],
    isLimitedEdition: false,
    inStock: true,
    badge: 'Couture Edition',
  },
  {
    id: 'p3',
    slug: 'noor-anarkali-set',
    name: 'Noor Anarkali with Dupatta',
    subtitle: 'Noor-e-Rang Collection',
    price: 38500,
    currency: '₹',
    collection: 'Noor-e-Rang',
    collectionSlug: 'noor-e-rang',
    description:
      "The Noor Anarkali is a sweeping floor-length silhouette in pure georgette, hand-embroidered with delicate chikankari florals in ivory thread. Paired with a tissue silk dupatta with antique zari border. A timeless piece that bridges the grandeur of Lucknow's artisanal tradition with modern minimal dressing.",
    fabric: 'Pure Georgette Crepe. Embroidery: Hand Chikankari. Dupatta: Tissue Silk with Zari.',
    care: ['Dry clean only', 'Press reverse side only', 'Store in provided muslin cover'],
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfuxqZf27ins7Kdr765TAwhjxQcguh3iNl59grkP5K9Gm6ugHPnQeUaR0ZO38jDgoi1-52lBXqSe3c3u3kTnaMJ3qJi0EDLh1IzOAyPMY2CqV9pPPGyTcfsp7pfAtAGMMludLl0T1Mu72m9k795LFl7yUJywYNhH1t1RFZeSn-uzeTD0eL67QW1dodLgtFfwpxiZHHwFZs72NVMU7QB-Pyey6qCv987D63rg2O5303',
        alt: 'Noor Anarkali Front',
        isPrimary: true,
      },
    ],
    sizes: [
      { label: 'XS', available: true },
      { label: 'S', available: true },
      { label: 'M', available: false },
      { label: 'L', available: true },
      { label: 'XL', available: true },
    ],
    colors: [
      { name: 'Ivory', hex: '#F5F0E8' },
      { name: 'Sage Green', hex: '#7B9B7B' },
      { name: 'Coral Blush', hex: '#E8846A' },
    ],
    tags: ['anarkali', 'chikankari', 'georgette', 'lucknow', 'dupatta'],
    isLimitedEdition: false,
    inStock: true,
  },
  {
    id: 'p4',
    slug: 'amber-palazzo-set',
    name: 'Amber Fort Palazzo Co-Ord',
    subtitle: 'Noor-e-Rang Collection',
    price: 29500,
    currency: '₹',
    collection: 'Noor-e-Rang',
    collectionSlug: 'noor-e-rang',
    description:
      "Inspired by the sunlit sandstone of Amber Fort, this palazzo co-ord set captures Jaipur's imperial warmth. Wide-leg palazzo pants in handloom cotton-silk blend with block-printed kurta featuring traditional Rajasthani motifs, re-imagined in a contemporary minimal palette.",
    fabric: 'Handloom Cotton-Silk Blend. Block Print: Natural Dyes.',
    care: ['Hand wash cold', 'Dry in shade', 'Iron at medium heat on reverse'],
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdF7HqcZiFZ0q2Ybz8iMZ-jVAJA15jgqYE4LwVVOv1R1FVOIrFCOaRIPBGIJR6p26kd-R5Lxv9T3bfmGQg5R5fqc5mVE2WV1Hy7gOvMFzq3wqiHVKqRnI3HopWuBJ7KbJl5a7jbHqD9KtPFyQpW3UqeXjXd3jPnA47e-BCBL6Zq9h6HkJZJhDL5wR0iVfDNfXt7kX_0xT7nB22Z2BtEjPuQN3T0bZQc5Pf7P3g',
        alt: 'Amber Palazzo Set',
        isPrimary: true,
      },
    ],
    sizes: [
      { label: 'XS', available: true },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
    ],
    colors: [
      { name: 'Amber Dusk', hex: '#D4845A' },
      { name: 'Indigo', hex: '#2C3E7A' },
      { name: 'Natural Ecru', hex: '#EDE8D8' },
    ],
    tags: ['palazzo', 'block-print', 'co-ord', 'rajasthan', 'cotton-silk'],
    isLimitedEdition: false,
    inStock: true,
  },
]

export const collections: Collection[] = [
  {
    id: 'c1',
    slug: 'noor-e-rang',
    title: 'Noor-e-Rang',
    subtitle: 'Luminous Hues of Rajasthan',
    description:
      "A celebration of Jaipur's imperial court palettes, hand-spun Chanderi silks, and meticulous antique gota patti embroidery. Echoes of Amber Fort sunlit arches meet pure contemporary drape architecture.",
    season: 'Autumn-Winter 2025',
    capsule: 'Capsule 04',
    heroImage: productImages.gulabi[0],
    mosaicImages: [
      productImages.gulabi[0],
      productImages.gulabi[1],
      productImages.gulabi[2],
    ],
    products: products.filter((p) => p.collectionSlug === 'noor-e-rang'),
    metrics: [
      { label: 'Archival Silhouettes', value: '14' },
      { label: 'Mulberry & Chanderi', value: '100%' },
      { label: 'Artisan Workshops', value: '6' },
    ],
  },
  {
    id: 'c2',
    slug: 'lantana',
    title: 'Lantana',
    subtitle: 'An Architecture of Bloom — Soft Hues',
    description:
      'For the girls who love timeless elegance. Architectural tailoring and delicate scalloped lace trims reimagined through soft pastel hues, handloom Chanderi silks, and shaded ombre dupattas.',
    season: 'Spring-Summer & Festive 2026',
    capsule: 'Edition 01/03',
    heroImage: siteImages.models.heroGirls,
    mosaicImages: [
      siteImages.models.heroGirls,
      siteImages.models.detailHues,
      siteImages.models.shootGrid,
    ],
    products: products.filter((p) => p.collectionSlug === 'lantana'),
    metrics: [
      { label: 'Hand-crafted pieces', value: '12' },
      { label: 'Soft Pastel Hues', value: '100%' },
      { label: 'Heritage Weavers', value: '8' },
    ],
  },
]

export function formatPrice(price: number, currency = '₹'): string {
  return `${currency}${price.toLocaleString('en-IN')}`
}
