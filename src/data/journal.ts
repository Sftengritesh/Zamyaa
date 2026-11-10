import type { JournalArticle } from '@/types'

export const journalCategories = [
  'All Stories',
  'Designer Notes',
  'Craft Stories',
  'Style Journal',
  'Behind the Scenes',
  'Fabric Stories',
] as const

export const seedArticles: JournalArticle[] = [
  {
    id: 'art-01',
    slug: 'the-inspiration-behind-lantana',
    title: 'The Inspiration Behind Lantana',
    subtitle: 'An architectural reverie in handloom Chanderi silks and delicate pastel botanicals.',
    excerpt:
      'Lantana began on a sun-drenched morning in Jaipur, observing how delicate wildflowers bloom fearlessly between centuries-old sandstone arches. The collection translates that quiet strength into soft pastel Chanderi silhouettes with hand-scalloped lace trims.',
    category: 'Designer Notes',
    author: 'Jyoti Sharma',
    readTime: '4 min read',
    publishedAt: '2026-03-15',
    status: 'published',
    isFeatured: true,
    coverImage: '/images/lantana/IMG_6642.jpeg',
    additionalImages: [
      '/images/lantana/IMG_6646.jpeg',
      '/images/lantana/IMG_6644.jpeg',
      '/images/lantana/IMG_6630.jpeg',
    ],
    tags: ['Lantana', 'Design Philosophy', 'Pastel Hues', 'Farshi Salwar'],
    content: `
# The Inspiration Behind Lantana

Lantana began on a quiet morning during one of my sourcing walks through the sunlit alleys of Jaipur. Amidst the grandeur of weathered ochre walls and ancient jali screens, wild lantana florets were flourishing in defiance of arid soil—tiny clusters of blush lilac and pale citron bathed in morning dew.

That moment crystallized the spirit of this capsule: a juxtaposition of regal architectural tailoring with the tenderness of blooming wild botanicals.

### Architecture Meets Softness

Traditional Indian couture often leans toward heavy metallics and dramatic velvets. With Lantana, I wanted to strip away excess weight and let the fabric breathe. We partnered with master generational weavers in Madhya Pradesh to spin pure Mulberry silk warp with featherlight handspun cotton weft, yielding a lustrous Chanderi with ethereal luminescence.

The silhouette honors the historic Farshi Gharara—the wide-legged court trousers worn by royal muses in Awadh—re-engineered with tailored pleats that fall gracefully without dragging awkwardly. Paired with a straight, sculpted kurti, the proportion feels entirely contemporary.

### The Signature Scalloped Edge

Look closely at the hem of each kurti and you will find our signature French cotton scalloped lace. Rather than applying machine embroidery directly onto silk, our women artisans dye each lace motif in small botanical batches, then hand-tack it along the edges with microscopic prick stitches.

When you walk, the hem floats. When you sit, the shaded ombre dupatta cascades like water. It is fashion created not for spectacle, but for the quiet poetry of personal presence.
`,
  },
  {
    id: 'art-02',
    slug: 'the-art-of-indian-craftsmanship',
    title: 'The Art of Indian Craftsmanship',
    subtitle: 'Preserving generational textile heritage across Rajasthan and Madhya Pradesh.',
    excerpt:
      'Every warp and weft spun on traditional pit looms carries centuries of collective memory. Inside our atelier, we work directly with master craftspeople to preserve techniques that industrial machines cannot replicate.',
    category: 'Craft Stories',
    author: 'Jyoti Sharma',
    readTime: '6 min read',
    publishedAt: '2026-02-28',
    status: 'published',
    isFeatured: true,
    coverImage: '/images/lantana/IMG_6646.jpeg',
    additionalImages: [
      '/images/lantana/IMG_6633.jpeg',
      '/images/lantana/IMG_6639.jpeg',
      '/images/lantana/IMG_6640.jpeg',
    ],
    tags: ['Handloom', 'Chanderi', 'Heritage Weavers', 'Artisans'],
    content: `
# The Art of Indian Craftsmanship

In an era of disposable fashion and hyper-speed production, true luxury is fundamentally about time: time spent waiting for natural monsoon riverbeds to dry, time spent grinding indigo cakes by hand, and time spent listening to the rhythmic wooden clatter of handloom shuttles.

At Zamyaa, craftsmanship is not a marketing buzzword—it is our primary design language.

### The Pit-Loom Virtuosos

The handloom Chanderi used in our ateliers comes from small weaver cooperatives in Central India. These artisans do not read automated punch cards; they memorize intricate booti spacing through generational oral songs sung while guiding the shuttle.

A single 3-meter length of genuine handloom silk can take upwards of eight working days to weave. The subtle organic slubs and slight thread variations are not flaws—they are the human fingerprint of an authentic craft object.

### Beyond Fast Fashion

Our design philosophy rests on small-batch production. We produce fewer than forty units of each design, ensuring that waste is minimized and our artisan partners receive fair, above-market compensation directly without intermediaries.

When you invest in a Zamyaa ensemble, you are actively sustaining an ecosystem of hereditary master makers whose skills have been honed across hundreds of years.
`,
  },
  {
    id: 'art-03',
    slug: 'styling-the-modern-farshi-suit',
    title: 'Styling the Modern Farshi Suit',
    subtitle: 'How to wear sweeping heritage trousers from intimate sangeets to black-tie celebrations.',
    excerpt:
      'The Farshi suit is defined by dramatic architectural volume that sweeps the floor with royal gravitas. Discover three effortless ways to style our Pink Topaz and Pastel Yellow ensembles for contemporary celebrations.',
    category: 'Style Journal',
    author: 'Atelier Styling Team',
    readTime: '5 min read',
    publishedAt: '2026-01-20',
    status: 'published',
    isFeatured: false,
    coverImage: '/images/lantana/IMG_6630.jpeg',
    additionalImages: [
      '/images/lantana/IMG_6637.jpeg',
      '/images/lantana/IMG_6644.jpeg',
    ],
    tags: ['Styling Guide', 'Farshi Salwar', 'Festive Styling', 'Editorial'],
    content: `
# Styling the Modern Farshi Suit

The Farshi suit is among the most regal silhouettes in Indian sartorial history. Originating in royal Mughal and Awadhi courts, the word *farshi* literally translates to "sweeping the floor."

Yet many modern women find themselves intimidated by the volume. Here is how our atelier stylists recommend wearing the silhouette for today’s occasions.

### Look 1: The Modern Minimalist (Daytime Weddings & Haldi)

For sunlit outdoor ceremonies, let the pastel hues take center stage:
- **Hair**: A clean, low center-parted chignon adorned with fresh baby’s breath or small white jasmine buds.
- **Jewelry**: Uncut diamond or polki stud earrings with a single baroque pearl drop. Forego the heavy necklace entirely to keep the delicate scalloped neckline clean and uncluttered.
- **Footwear**: Metallic raw-silk juttis with tonal zardozi embroidery or minimal nude block heels.

### Look 2: The Sangeet Celebration

When movement and dance are the focus, embrace the fluidity:
- **Dupatta Draping**: Fold the shaded ombre dupatta into accordion pleats and pin it at the left shoulder with an antique brooch, allowing both hands complete freedom.
- **Jewelry**: Layered heirloom gold bangles that catch the stage lights as your wrists move.

### Look 3: Black-Tie Atelier Glamour

For formal evening receptions:
- **Hair**: Soft, undulating Hollywood waves swept to one side.
- **Accents**: A sculpted ivory minaudière or vintage raw silk clutch.
`,
  },
  {
    id: 'art-04',
    slug: 'inside-the-boho-flare-affair',
    title: 'Inside the Boho Flare Affair',
    subtitle: 'Fluid bohemian volume meets intricate hand-carved woodblock impressions.',
    excerpt:
      'Conceived as an ode to untamed spirit and effortless rhythm. Exploring the contrast between Design 01’s teardrop booti gathers and Design 02’s geometric mandala jaal in earthy moss olive.',
    category: 'Behind the Scenes',
    author: 'Jyoti Sharma',
    readTime: '5 min read',
    publishedAt: '2026-03-22',
    status: 'published',
    isFeatured: true,
    coverImage: '/images/the-boho-flare-affair/IMG_6681.jpeg',
    additionalImages: [
      '/images/the-boho-flare-affair/IMG_6680.jpeg',
      '/images/the-boho-flare-affair/IMG_6686.jpeg',
      '/images/the-boho-flare-affair/IMG_6659.jpeg',
      '/images/the-boho-flare-affair/IMG_6665.jpeg',
    ],
    tags: ['The Boho Flare Affair', 'Block Print', 'Behind The Scenes', 'Tiered Skirt'],
    content: `
# Inside the Boho Flare Affair

When designing *The Boho Flare Affair*, we wanted to step away from traditional gala formality and explore an organic, free-spirited bohemian cadence.

We asked ourselves: how can traditional Indian hand-block printing feel effortlessly youthful, dynamic, and globally wearable?

### Two Silhouettes, One Harmonious Universe

Rather than offering one silhouette in multiple colors, we chose to create **two completely distinct designs** united by an earthy moss-olive palette:

1. **Design 01 — Scoop Neck Booti Tiered Set**:
   Featuring delicate teardrop floral butis stamped across a generous 3-tiered gathered maxi skirt. The crop top features a sculpted scoop neckline with smocked elastic back panels for custom ease.

2. **Design 02 — Halter Mandala Tiered Set**:
   A high halter collar adorned with complex mandala jaal impressions and geometric chevron border trims that draw the eye upwards.

### Shooting on Heritage Cobblestones

Our lookbook campaign was photographed on location in Rajasthan against centuries-old carved teak doorways and sun-dappled heritage stone lanes. We asked our models not to pose rigidly, but to laugh, swirl, and move naturally.

The expansive tiered skirt volume—measuring over 18 meters of fluid hem sweep—billows with every stride.
`,
  },
  {
    id: 'art-05',
    slug: 'the-details-behind-every-stitch',
    title: 'The Details Behind Every Stitch',
    subtitle: 'A forensic macro look at hand-pressed block printing, natural mineral dyes, and French lace.',
    excerpt:
      'Take a magnifying glass to a Zamyaa garment and you will notice micro-variations in dye density—the unmistakable signature of the human hand at work.',
    category: 'Fabric Stories',
    author: 'Atelier Textile Lab',
    readTime: '4 min read',
    publishedAt: '2026-03-05',
    status: 'published',
    isFeatured: false,
    coverImage: '/images/the-boho-flare-affair/IMG_6686.jpeg',
    additionalImages: [
      '/images/the-boho-flare-affair/IMG_6662.jpeg',
      '/images/the-boho-flare-affair/IMG_6670.jpeg',
      '/images/the-boho-flare-affair/IMG_6684.jpeg',
    ],
    tags: ['Textile Lab', 'Woodblock Art', 'Fabric Macro', 'Atelier'],
    content: `
# The Details Behind Every Stitch

In the world of high fashion, true beauty reveals itself at macro distance. When you inspect a Zamyaa garment up close, you are looking at the work of skilled hands:

### 1. Hand-Carved Teakwood Blocks
Every pattern begins as a sketch drawn by Jyoti on paper, which is then traced onto seasoned Sheesham woodblocks. Master carvers hand-chisel the fine ridges using miniscule iron gouges over three days.

### 2. The Printing Table Rhythm
The artisan dips the wooden block into natural mineral dye pastes, tests the registration on scrap cotton, and presses it firmly onto taut glazed cotton silk with a sharp strike of the fist. This rhythmic thudding resonates through the printing shed all morning.

### 3. Smocked Flexibility
Luxury must never sacrifice comfort. Both designs in our Boho Flare capsule incorporate hand-smocked elasticated rear bodices. This allows the crop top to adapt seamlessly to body movement without pinching or zipper fatigue.
`,
  },
]

