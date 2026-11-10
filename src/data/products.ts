import type { Product, Collection } from '@/types'
import { siteImages } from '@/config/images'

export function formatPrice(price: number, currency = '₹'): string {
  return `${currency}${price.toLocaleString('en-IN')}`
}

export const productImages = {
  lantana: [
    siteImages.models.heroGirls,
    siteImages.models.detailHues,
    siteImages.models.shootGrid,
  ],
  bohoFlare: [
    '/images/the-boho-flare-affair/IMG_6681.jpeg',
    '/images/the-boho-flare-affair/IMG_6686.jpeg',
    '/images/the-boho-flare-affair/IMG_6680.jpeg',
  ],
}

export const products: Product[] = [
  {
    "id": "p5",
    "slug": "the-lantana-gul-e-bahar-lilac-farshi-suit-set",
    "name": "The Lantana Farshi Suit-Set — Pink Topaz",
    "subtitle": "For the girls who love timeless elegance · Soft Hues Edition",
    "price": 34500,
    "originalPrice": 42000,
    "currency": "₹",
    "collection": "Lantana",
    "collectionSlug": "lantana",
    "category": "Farshi Suit-Set",
    "description": "For the girls who love timeless elegance. A lyrical Farshi suit-set in soft Pink Topaz and lemon citron, tailored in breathable handloom Chanderi silk with delicate gold floral butis. Features artisanal scalloped cotton lace trims along the hemline, flowing wide farshi trousers, and a dual-toned shaded ombre dupatta with handcrafted tassels.",
    "fabric": "Handloom Chanderi Silk Kurti, Pure Mul Cotton Farshi Trousers, Shaded Chiffon Dupatta with handmade thread tassels.",
    "care": [
      "Dry clean only",
      "Store flat in pure muslin cover",
      "Steam iron with reverse protection",
      "Do not bleach"
    ],
    "images": [
      {
        "url": "/images/lantana/IMG_6642.jpeg",
        "alt": "The Lantana Timeless Elegance - Dual Models in Pastel Silhouettes",
        "isPrimary": true
      },
      {
        "url": "/images/lantana/IMG_6630.jpeg",
        "alt": "Lantana Farshi Suit-Set - Pink Topaz Model Front View"
      },
      {
        "url": "/images/lantana/IMG_6637.jpeg",
        "alt": "Lantana Farshi Suit-Set - Pastel Yellow Model Front View"
      },
      {
        "url": "/images/lantana/IMG_6631.jpeg",
        "alt": "Lantana Pink Topaz Model Profile & Floral Braid"
      },
      {
        "url": "/images/lantana/IMG_6633.jpeg",
        "alt": "Pink Topaz Kurti - Handcrafted Scalloped Neckline"
      },
      {
        "url": "/images/lantana/IMG_6634.jpeg",
        "alt": "Pink Topaz Model Holding Dahlias in Garden"
      },
      {
        "url": "/images/lantana/IMG_6635.jpeg",
        "alt": "Pastel Yellow Model Seated on Garden Lawn"
      },
      {
        "url": "/images/lantana/IMG_6636.jpeg",
        "alt": "Pastel Yellow Model Garden Portrait"
      },
      {
        "url": "/images/lantana/IMG_6638.jpeg",
        "alt": "Pink Topaz Kurti - Scalloped Back Straps & Butis"
      },
      {
        "url": "/images/lantana/IMG_6639.jpeg",
        "alt": "Pleated Farshi Salwar Hem & Lace Craftsmanship"
      },
      {
        "url": "/images/lantana/IMG_6640.jpeg",
        "alt": "Pastel Yellow Kurti - Scalloped Neckline & Dupatta Draping"
      },
      {
        "url": "/images/lantana/IMG_6644.jpeg",
        "alt": "Dual Models Seated Together on Garden Lawn with Long Braids"
      },
      {
        "url": "/images/lantana/IMG_6645.jpeg",
        "alt": "Dual Models Posing with Garden Flower Basket"
      },
      {
        "url": "/images/lantana/IMG_6646.jpeg",
        "alt": "Detailed Scalloped French Cotton Lace Trims - Soft Hues"
      },
      {
        "url": "/images/lantana/IMG_6647.jpeg",
        "alt": "Lantana Spring-Summer Atelier Campaign Garden View"
      },
      {
        "url": "/images/lantana/IMG_6643.jpeg",
        "alt": "Lantana Dual Silhouettes Garden Atmosphere"
      },
      {
        "url": "/images/lantana/IMG_6632.jpeg",
        "alt": "Official Pantone Color Swatches: Pink Topaz & Pastel Yellow"
      }
    ],
    "sizes": [
      {
        "label": "XS",
        "available": true,
        "measurements": "Bust 32\" / Waist 26\""
      },
      {
        "label": "S",
        "available": true,
        "measurements": "Bust 34\" / Waist 28\""
      },
      {
        "label": "M",
        "available": true,
        "measurements": "Bust 36\" / Waist 30\""
      },
      {
        "label": "L",
        "available": true,
        "measurements": "Bust 38\" / Waist 32\""
      },
      {
        "label": "XL",
        "available": true,
        "measurements": "Bust 40\" / Waist 34\""
      },
      {
        "label": "Custom",
        "available": true,
        "measurements": "Tailored to client measurements"
      }
    ],
    "colors": [
      {
        "name": "Pink Topaz & Citron",
        "hex": "#F4A7BB",
        "image": "/images/lantana/IMG_6630.jpeg"
      },
      {
        "name": "Pastel Yellow & Lilac",
        "hex": "#EFE7A4",
        "image": "/images/lantana/IMG_6637.jpeg"
      }
    ],
    "tags": [
      "farshi-suit-set",
      "lantana",
      "pink-topaz",
      "pastel",
      "soft-hues",
      "lace",
      "dupatta"
    ],
    "sku": "ZY-LNT-01",
    "status": "active",
    "isFeatured": true,
    "isBestseller": true,
    "isLimitedEdition": true,
    "limitedCount": 45,
    "inStock": true,
    "badge": "Signature Piece",
    "inventory": [
      {
        "sku": "ZY-LNT-01-XS",
        "color": "Pink Topaz & Citron",
        "size": "XS",
        "stock": 5,
        "lowStockThreshold": 2
      },
      {
        "sku": "ZY-LNT-01-S",
        "color": "Pink Topaz & Citron",
        "size": "S",
        "stock": 8,
        "lowStockThreshold": 2
      },
      {
        "sku": "ZY-LNT-01-M",
        "color": "Pink Topaz & Citron",
        "size": "M",
        "stock": 10,
        "lowStockThreshold": 2
      },
      {
        "sku": "ZY-LNT-01-L",
        "color": "Pink Topaz & Citron",
        "size": "L",
        "stock": 6,
        "lowStockThreshold": 2
      },
      {
        "sku": "ZY-LNT-01-XL",
        "color": "Pink Topaz & Citron",
        "size": "XL",
        "stock": 4,
        "lowStockThreshold": 2
      }
    ]
  },
  {
    "id": "p6",
    "slug": "the-lantana-farshi-suit-set-pastel-yellow",
    "name": "The Lantana Farshi Suit-Set — Pastel Yellow",
    "subtitle": "For the girls who love timeless elegance · Soft Hues Edition",
    "price": 34500,
    "originalPrice": 42000,
    "currency": "₹",
    "collection": "Lantana",
    "collectionSlug": "lantana",
    "category": "Farshi Suit-Set",
    "description": "For the girls who love timeless elegance. Radiant pastel butter yellow handloom Chanderi kurti paired with lilac-hued pleated farshi trousers. Embellished with French scalloped cotton lace edging, fine zari booti motifs, and shaded ombre georgette dupatta.",
    "fabric": "Pure Handloom Chanderi Kurti, Glazed Cotton Farshi Salwar, Ombre Chiffon Dupatta.",
    "care": [
      "Dry clean only",
      "Store flat in pure muslin cover",
      "Steam iron with reverse protection",
      "Do not bleach"
    ],
    "images": [
      {
        "url": "/images/lantana/IMG_6642.jpeg",
        "alt": "The Lantana Timeless Elegance - Dual Models in Pastel Silhouettes",
        "isPrimary": true
      },
      {
        "url": "/images/lantana/IMG_6637.jpeg",
        "alt": "Lantana Farshi Suit-Set - Pastel Yellow Model Front View"
      },
      {
        "url": "/images/lantana/IMG_6630.jpeg",
        "alt": "Lantana Farshi Suit-Set - Pink Topaz Model Front View"
      },
      {
        "url": "/images/lantana/IMG_6631.jpeg",
        "alt": "Lantana Pink Topaz Model Profile & Floral Braid"
      },
      {
        "url": "/images/lantana/IMG_6633.jpeg",
        "alt": "Pink Topaz Kurti - Handcrafted Scalloped Neckline"
      },
      {
        "url": "/images/lantana/IMG_6634.jpeg",
        "alt": "Pink Topaz Model Holding Dahlias in Garden"
      },
      {
        "url": "/images/lantana/IMG_6635.jpeg",
        "alt": "Pastel Yellow Model Seated on Garden Lawn"
      },
      {
        "url": "/images/lantana/IMG_6636.jpeg",
        "alt": "Pastel Yellow Model Garden Portrait"
      },
      {
        "url": "/images/lantana/IMG_6638.jpeg",
        "alt": "Pink Topaz Kurti - Scalloped Back Straps & Butis"
      },
      {
        "url": "/images/lantana/IMG_6639.jpeg",
        "alt": "Pleated Farshi Salwar Hem & Lace Craftsmanship"
      },
      {
        "url": "/images/lantana/IMG_6640.jpeg",
        "alt": "Pastel Yellow Kurti - Scalloped Neckline & Dupatta Draping"
      },
      {
        "url": "/images/lantana/IMG_6644.jpeg",
        "alt": "Dual Models Seated Together on Garden Lawn with Long Braids"
      },
      {
        "url": "/images/lantana/IMG_6645.jpeg",
        "alt": "Dual Models Posing with Garden Flower Basket"
      },
      {
        "url": "/images/lantana/IMG_6646.jpeg",
        "alt": "Detailed Scalloped French Cotton Lace Trims - Soft Hues"
      },
      {
        "url": "/images/lantana/IMG_6647.jpeg",
        "alt": "Lantana Spring-Summer Atelier Campaign Garden View"
      },
      {
        "url": "/images/lantana/IMG_6643.jpeg",
        "alt": "Lantana Dual Silhouettes Garden Atmosphere"
      },
      {
        "url": "/images/lantana/IMG_6632.jpeg",
        "alt": "Official Pantone Color Swatches: Pink Topaz & Pastel Yellow"
      }
    ],
    "sizes": [
      {
        "label": "XS",
        "available": true,
        "measurements": "Bust 32\" / Waist 26\""
      },
      {
        "label": "S",
        "available": true,
        "measurements": "Bust 34\" / Waist 28\""
      },
      {
        "label": "M",
        "available": true,
        "measurements": "Bust 36\" / Waist 30\""
      },
      {
        "label": "L",
        "available": true,
        "measurements": "Bust 38\" / Waist 32\""
      },
      {
        "label": "XL",
        "available": true,
        "measurements": "Bust 40\" / Waist 34\""
      },
      {
        "label": "Custom",
        "available": true,
        "measurements": "Tailored to client measurements"
      }
    ],
    "colors": [
      {
        "name": "Pastel Yellow & Lilac",
        "hex": "#EFE7A4",
        "image": "/images/lantana/IMG_6637.jpeg"
      },
      {
        "name": "Pink Topaz & Citron",
        "hex": "#F4A7BB",
        "image": "/images/lantana/IMG_6630.jpeg"
      }
    ],
    "tags": [
      "farshi-suit-set",
      "lantana",
      "pastel-yellow",
      "soft-hues",
      "lace",
      "dupatta"
    ],
    "sku": "ZY-LNT-02",
    "status": "active",
    "isFeatured": true,
    "isBestseller": false,
    "isLimitedEdition": true,
    "limitedCount": 40,
    "inStock": true,
    "badge": "Atelier Favorite",
    "inventory": [
      {
        "sku": "ZY-LNT-02-XS",
        "color": "Pastel Yellow & Lilac",
        "size": "XS",
        "stock": 4,
        "lowStockThreshold": 2
      },
      {
        "sku": "ZY-LNT-02-S",
        "color": "Pastel Yellow & Lilac",
        "size": "S",
        "stock": 7,
        "lowStockThreshold": 2
      },
      {
        "sku": "ZY-LNT-02-M",
        "color": "Pastel Yellow & Lilac",
        "size": "M",
        "stock": 9,
        "lowStockThreshold": 2
      },
      {
        "sku": "ZY-LNT-02-L",
        "color": "Pastel Yellow & Lilac",
        "size": "L",
        "stock": 5,
        "lowStockThreshold": 2
      },
      {
        "sku": "ZY-LNT-02-XL",
        "color": "Pastel Yellow & Lilac",
        "size": "XL",
        "stock": 3,
        "lowStockThreshold": 2
      }
    ]
  },
  {
    "id": "p-bfa-1",
    "slug": "the-boho-flare-scoop-booti-skirt-top-set",
    "name": "The Boho Flare Scoop Neck Tiered Skirt & Crop Top",
    "subtitle": "Design 01 · Teardrop Booti Tiered Maxi Capsule",
    "price": 34000,
    "originalPrice": 42000,
    "currency": "₹",
    "collection": "The Boho Flare Affair",
    "collectionSlug": "the-boho-flare-affair",
    "category": "Skirt Top",
    "description": "Design 01 of The Boho Flare Affair. An earthy moss-olive tiered skirt and crop top ensemble featuring delicate teardrop gold booti block motifs. Designed with a wide scoop neckline halter crop top with smocked back elasticity, paired with a sweeping triple-tiered gathered maxi skirt with dramatic bohemian flare.",
    "fabric": "Pure Handspun Glazed Cotton Silk, Hand-Block Booti Print, Smocked Elastic Back Bodice.",
    "care": [
      "Dry clean only",
      "Store flat in muslin garment bag",
      "Steam iron inside out with protective layer",
      "Do not machine wash or wring"
    ],
    "images": [
      {
        "url": "/images/the-boho-flare-affair/IMG_6681.jpeg",
        "alt": "The Boho Flare Affair - Dual Silhouette Preview Look",
        "isPrimary": true
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6659.jpeg",
        "alt": "Design 01: Scoop Neck Booti Tiered Skirt Top - Seated Front Sun View"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6660.jpeg",
        "alt": "Design 01: Seated Profile Look with Gathered Tiered Skirt"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6662.jpeg",
        "alt": "Design 01: Bodice Neckline & Stacked Wooden Bangles Detail"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6661.jpeg",
        "alt": "Design 01: Smiling Portrait in Sunlight"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6664.jpeg",
        "alt": "Design 01: Frontal Seated Perspective"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6663.jpeg",
        "alt": "Design 01: Full Flare Hemline and Teardrop Booti Print"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6686.jpeg",
        "alt": "Close-Up Comparison: Booti Print vs. Mandala Jaal Print"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6684.jpeg",
        "alt": "Dual Models Back View: Smocked Elastic Crop Top Backs"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6680.jpeg",
        "alt": "Dual Models Seated on Cobblestone with Flowing Skirts"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6677.jpeg",
        "alt": "Dual Models Standing Holding Hands by Rustic Door"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6678.jpeg",
        "alt": "Candid Street Celebration with Vintage Glass Bottles"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6679.jpeg",
        "alt": "Dual Models Laughing in Sunlit Heritage Lane"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6685.jpeg",
        "alt": "Dual Silhouette Side & Back Silhouette Comparison"
      }
    ],
    "sizes": [
      {
        "label": "XS",
        "available": true,
        "measurements": "Bust 32\" / Waist 26\""
      },
      {
        "label": "S",
        "available": true,
        "measurements": "Bust 34\" / Waist 28\""
      },
      {
        "label": "M",
        "available": true,
        "measurements": "Bust 36\" / Waist 30\""
      },
      {
        "label": "L",
        "available": true,
        "measurements": "Bust 38\" / Waist 32\""
      },
      {
        "label": "XL",
        "available": true,
        "measurements": "Bust 40\" / Waist 34\""
      },
      {
        "label": "Custom",
        "available": true,
        "measurements": "Tailored to client measurements"
      }
    ],
    "colors": [
      {
        "name": "Moss Olive (Design 01 - Booti)",
        "hex": "#5A6347",
        "image": "/images/the-boho-flare-affair/IMG_6659.jpeg"
      }
    ],
    "tags": [
      "skirt-top",
      "the-boho-flare-affair",
      "boho",
      "tiered-skirt",
      "crop-top",
      "moss-olive",
      "booti"
    ],
    "sku": "ZY-BFA-D1",
    "status": "active",
    "isFeatured": true,
    "isBestseller": true,
    "isLimitedEdition": true,
    "limitedCount": 35,
    "inStock": true,
    "badge": "Design 01",
    "inventory": [
      {
        "sku": "ZY-BFA-D1-XS",
        "color": "Moss Olive (Design 01 - Booti)",
        "size": "XS",
        "stock": 5,
        "lowStockThreshold": 2
      },
      {
        "sku": "ZY-BFA-D1-S",
        "color": "Moss Olive (Design 01 - Booti)",
        "size": "S",
        "stock": 8,
        "lowStockThreshold": 2
      },
      {
        "sku": "ZY-BFA-D1-M",
        "color": "Moss Olive (Design 01 - Booti)",
        "size": "M",
        "stock": 10,
        "lowStockThreshold": 2
      },
      {
        "sku": "ZY-BFA-D1-L",
        "color": "Moss Olive (Design 01 - Booti)",
        "size": "L",
        "stock": 6,
        "lowStockThreshold": 2
      },
      {
        "sku": "ZY-BFA-D1-XL",
        "color": "Moss Olive (Design 01 - Booti)",
        "size": "XL",
        "stock": 4,
        "lowStockThreshold": 2
      }
    ]
  },
  {
    "id": "p-bfa-2",
    "slug": "the-boho-flare-halter-mandala-skirt-top-set",
    "name": "The Boho Flare Halter Neck Tiered Skirt & Crop Top",
    "subtitle": "Design 02 · Mandala Jaal Border Tiered Capsule",
    "price": 35500,
    "originalPrice": 43500,
    "currency": "₹",
    "collection": "The Boho Flare Affair",
    "collectionSlug": "the-boho-flare-affair",
    "category": "Skirt Top",
    "description": "Design 02 of The Boho Flare Affair. A regal high halter neck crop top with intricate hand-block mandala jaal and chevron borders, smocked back detailing, and a coordinating tiered flared maxi skirt finished with an ornamental heritage border hem.",
    "fabric": "Pure Handspun Glazed Cotton Silk, Intricate Mandala Jaal Block Print, Smocked Elastic Back Bodice.",
    "care": [
      "Dry clean only",
      "Store flat in muslin garment bag",
      "Steam iron inside out with protective layer",
      "Do not machine wash or wring"
    ],
    "images": [
      {
        "url": "/images/the-boho-flare-affair/IMG_6681.jpeg",
        "alt": "The Boho Flare Affair - Dual Silhouette Preview Look",
        "isPrimary": true
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6665.jpeg",
        "alt": "Design 02: Halter Neck Mandala Tiered Skirt Top - Full Length with Sling"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6668.jpeg",
        "alt": "Design 02: Halter Neckline Bodice & Gold Bangles Close-Up"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6670.jpeg",
        "alt": "Design 02: Hand-Block Geometric Mandala Print & Border Hem Detail"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6667.jpeg",
        "alt": "Design 02: Full Alleyway Back View with Smocked Bodice"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6666.jpeg",
        "alt": "Design 02: Seated Perspective with Expansive Tiered Flared Skirt"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6671.jpeg",
        "alt": "Design 02: Sunlit Portrait Shielding Face by Teak Door"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6672.jpeg",
        "alt": "Design 02: Serene Seated Gaze with Flared Skirt Spread"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6669.jpeg",
        "alt": "Design 02: Back Silhouette Reaching Upwards"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6686.jpeg",
        "alt": "Close-Up Comparison: Mandala Jaal vs. Booti Print"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6684.jpeg",
        "alt": "Dual Models Back View: Smocked Bodice Details"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6680.jpeg",
        "alt": "Dual Models Seated on Cobblestone with Flowing Skirts"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6677.jpeg",
        "alt": "Dual Models Standing Holding Hands by Rustic Door"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6678.jpeg",
        "alt": "Candid Street Celebration with Vintage Glass Bottles"
      },
      {
        "url": "/images/the-boho-flare-affair/IMG_6685.jpeg",
        "alt": "Dual Silhouette Side & Back Silhouette Comparison"
      }
    ],
    "sizes": [
      {
        "label": "XS",
        "available": true,
        "measurements": "Bust 32\" / Waist 26\""
      },
      {
        "label": "S",
        "available": true,
        "measurements": "Bust 34\" / Waist 28\""
      },
      {
        "label": "M",
        "available": true,
        "measurements": "Bust 36\" / Waist 30\""
      },
      {
        "label": "L",
        "available": true,
        "measurements": "Bust 38\" / Waist 32\""
      },
      {
        "label": "XL",
        "available": true,
        "measurements": "Bust 40\" / Waist 34\""
      },
      {
        "label": "Custom",
        "available": true,
        "measurements": "Tailored to client measurements"
      }
    ],
    "colors": [
      {
        "name": "Moss Olive (Design 02 - Mandala)",
        "hex": "#5A6347",
        "image": "/images/the-boho-flare-affair/IMG_6665.jpeg"
      }
    ],
    "tags": [
      "skirt-top",
      "the-boho-flare-affair",
      "boho",
      "tiered-skirt",
      "halter-top",
      "moss-olive",
      "mandala"
    ],
    "sku": "ZY-BFA-D2",
    "status": "active",
    "isFeatured": true,
    "isBestseller": false,
    "isLimitedEdition": true,
    "limitedCount": 30,
    "inStock": true,
    "badge": "Design 02",
    "inventory": [
      {
        "sku": "ZY-BFA-D2-XS",
        "color": "Moss Olive (Design 02 - Mandala)",
        "size": "XS",
        "stock": 4,
        "lowStockThreshold": 2
      },
      {
        "sku": "ZY-BFA-D2-S",
        "color": "Moss Olive (Design 02 - Mandala)",
        "size": "S",
        "stock": 7,
        "lowStockThreshold": 2
      },
      {
        "sku": "ZY-BFA-D2-M",
        "color": "Moss Olive (Design 02 - Mandala)",
        "size": "M",
        "stock": 9,
        "lowStockThreshold": 2
      },
      {
        "sku": "ZY-BFA-D2-L",
        "color": "Moss Olive (Design 02 - Mandala)",
        "size": "L",
        "stock": 5,
        "lowStockThreshold": 2
      },
      {
        "sku": "ZY-BFA-D2-XL",
        "color": "Moss Olive (Design 02 - Mandala)",
        "size": "XL",
        "stock": 3,
        "lowStockThreshold": 2
      }
    ]
  }
]

export const collections: Collection[] = ([
  {
    "id": "c-neel-pushp",
    "slug": "neel-pushp",
    "title": "Neel Pushp",
    "subtitle": "Indigo Blooms & Midnight Silks",
    "description": "Inspired by twilight indigo flora and intricate Persian butis hand-woven into lustrous Chanderi and mulberry silks.",
    "season": "Spring-Summer 2026",
    "capsule": "Capsule 01",
    "heroImage": "",
    "mosaicImages": [],
    "status": "coming_soon",
    "displayOrder": 1,
    "isOld": false,
    "metrics": [
      {
        "label": "Archival Silhouettes",
        "value": "10"
      },
      {
        "label": "Mulberry Silk",
        "value": "100%"
      },
      {
        "label": "Master Weavers",
        "value": "6"
      }
    ],
    "productIds": [],
    "isComingSoon": true
  },
  {
    "id": "c-sunehri-dhoop",
    "slug": "sunehri-dhoop",
    "title": "Sunehri Dhoop",
    "subtitle": "Golden Sunrays & Warm Metallics",
    "description": "A radiant reverie bathed in midday amber sunlight, antique marodi embroidery, and molten zari weaves.",
    "season": "Festive-Resort 2026",
    "capsule": "Capsule 02",
    "heroImage": "",
    "mosaicImages": [],
    "status": "coming_soon",
    "displayOrder": 2,
    "isOld": false,
    "metrics": [
      {
        "label": "Golden Weaves",
        "value": "8"
      },
      {
        "label": "Pure Tissue Silk",
        "value": "100%"
      },
      {
        "label": "Handcrafted Hours",
        "value": "140+"
      }
    ],
    "productIds": [],
    "isComingSoon": true
  },
  {
    "id": "c-desi-dastaan",
    "slug": "desi-dastaan",
    "title": "Desi Dastaan",
    "subtitle": "Tales of Indian Heirlooms",
    "description": "Nostalgic celebrations of indigenous textile crafts, royal courts of Awadh, and timeless trousseau elegance.",
    "season": "Heritage Edition 2026",
    "capsule": "Edition 03",
    "heroImage": "",
    "mosaicImages": [],
    "status": "coming_soon",
    "displayOrder": 3,
    "isOld": false,
    "metrics": [
      {
        "label": "Heirloom Patterns",
        "value": "12"
      },
      {
        "label": "Handloom Cotton-Silk",
        "value": "100%"
      },
      {
        "label": "Artisan Clusters",
        "value": "5"
      }
    ],
    "productIds": [],
    "isComingSoon": true
  },
  {
    "id": "c-noor-e-rang",
    "slug": "noor-e-rang",
    "title": "Noor-e-Rang",
    "subtitle": "Luminous Hues of Rajasthan",
    "description": "A celebration of imperial court palettes, hand-spun Chanderi silks, and meticulous antique gota patti embroidery.",
    "season": "Autumn-Winter 2025",
    "capsule": "Capsule 04",
    "heroImage": "",
    "mosaicImages": [],
    "status": "coming_soon",
    "displayOrder": 4,
    "isOld": false,
    "metrics": [
      {
        "label": "Archival Silhouettes",
        "value": "14"
      },
      {
        "label": "Mulberry & Chanderi",
        "value": "100%"
      },
      {
        "label": "Artisan Workshops",
        "value": "6"
      }
    ],
    "productIds": [],
    "isComingSoon": true
  },
  {
    "id": "c-the-boho-flare-affair",
    "slug": "the-boho-flare-affair",
    "title": "The Boho Flare Affair",
    "subtitle": "Bohemian Heritage Silhouettes — Skirt Top",
    "description": "Design 01 & 02: Sculpted scoop and halter neck crop tops paired with sweeping triple-tiered gathered maxi skirts. Crafted with authentic heritage prints and smocked detailing. Currently in atelier production.",
    "season": "Summer Festival 2026",
    "capsule": "Capsule 02",
    "heroImage": "/images/the-boho-flare-affair/IMG_6681.jpeg",
    "mosaicImages": [
      "/images/the-boho-flare-affair/IMG_6681.jpeg",
      "/images/the-boho-flare-affair/IMG_6686.jpeg",
      "/images/the-boho-flare-affair/IMG_6680.jpeg"
    ],
    "status": "active",
    "displayOrder": 2,
    "isOld": false,
    "metrics": [
      {
        "label": "Silhouettes",
        "value": "2"
      },
      {
        "label": "Heritage Block",
        "value": "100%"
      },
      {
        "label": "Tiered Cuts",
        "value": "Triple"
      }
    ],
    "productIds": [
      "p-bfa-1",
      "p-bfa-2"
    ],
    "isComingSoon": false
  },
  {
    "id": "c-lantana",
    "slug": "lantana",
    "title": "Lantana",
    "subtitle": "An Architecture of Bloom — Soft Hues",
    "description": "For the girls who love timeless elegance. Architectural tailoring and delicate scalloped lace trims reimagined through soft pastel hues and shaded ombre dupattas.",
    "season": "Spring-Summer & Festive 2026",
    "capsule": "Edition 01/03",
    "heroImage": "/images/lantana/IMG_6642.jpeg",
    "mosaicImages": [
      "/images/lantana/IMG_6642.jpeg",
      "/images/lantana/IMG_6646.jpeg",
      "/images/lantana/IMG_6644.jpeg"
    ],
    "status": "active",
    "displayOrder": 6,
    "isOld": false,
    "metrics": [
      {
        "label": "Hand-crafted Pieces",
        "value": "8"
      },
      {
        "label": "Natural Zardozi",
        "value": "100%"
      },
      {
        "label": "Heritage Artisans",
        "value": "12"
      }
    ],
    "productIds": [
      "p5",
      "p6"
    ],
    "isComingSoon": false
  },
  {
    "id": "c-zarrin",
    "slug": "zarrin",
    "title": "Zarrin",
    "subtitle": "Molten Gold & Evening Opulence",
    "description": "Decadent evening silhouettes in metallic tissue, antique badla work, and sculpted corsetry for majestic celebrations.",
    "season": "Couture Festive 2026",
    "capsule": "Couture Capsule",
    "heroImage": "",
    "mosaicImages": [],
    "status": "coming_soon",
    "displayOrder": 7,
    "isOld": false,
    "metrics": [
      {
        "label": "Couture Silhouettes",
        "value": "7"
      },
      {
        "label": "Metallic Tissue",
        "value": "100%"
      },
      {
        "label": "Zardozi Embroidery",
        "value": "Pure"
      }
    ],
    "productIds": [],
    "isComingSoon": true
  },
  {
    "id": "c-gulabi-noor",
    "slug": "gulabi-noor",
    "title": "Gulabi Noor",
    "subtitle": "Archival Rose Edition",
    "description": "The inaugural rose petal collection that defined the poetic romance and royal blush aesthetics of Zamyaa by Jyoti.",
    "season": "Archival AW2024",
    "capsule": "Archive Edition",
    "heroImage": "",
    "mosaicImages": [],
    "status": "coming_soon",
    "displayOrder": 8,
    "isOld": true,
    "metrics": [
      {
        "label": "Archival Ensembles",
        "value": "6"
      },
      {
        "label": "Vintage Chanderi",
        "value": "100%"
      },
      {
        "label": "Founding Year",
        "value": "2024"
      }
    ],
    "productIds": [],
    "isComingSoon": true
  },
  {
    "id": "c-neel-o-mitti",
    "slug": "neel-o-mitti",
    "title": "Neel-o-Mitti",
    "subtitle": "Of Earth & Indigo Dyes",
    "description": "Raw earthen clays, Bagru hand-block resist prints, and organic dip-dyed silks from our founding atelier archival vaults.",
    "season": "Archival SS2024",
    "capsule": "Archive Edition",
    "heroImage": "",
    "mosaicImages": [],
    "status": "coming_soon",
    "displayOrder": 9,
    "isOld": true,
    "metrics": [
      {
        "label": "Archival Pieces",
        "value": "5"
      },
      {
        "label": "Natural Indigo Dyes",
        "value": "100%"
      },
      {
        "label": "Earthen Weaves",
        "value": "Pure"
      }
    ],
    "productIds": [],
    "isComingSoon": true
  }
] as any[]).map(c => ({
  ...c,
  products: products.filter(p => p.collectionSlug === c.slug),
}))
