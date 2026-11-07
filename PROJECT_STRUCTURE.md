# ZAMYAA by jyoti — Project Folder Structure Guide

This guide explains the purpose of every folder and file in this codebase so anyone on your team can easily navigate and update the project.

```
zamyaa/
├── design-reference/           # Original Google Stitch designs & mockups (archived)
│   ├── raw-html/               # The 4 original HTML screens exported from Stitch
│   │   ├── 01-homepage.html
│   │   ├── 02-collections.html
│   │   ├── 03-product-detail.html
│   │   └── 04-checkout.html
│   ├── screenshots/            # High-resolution (2560px+) full-page screenshots
│   │   ├── 01-homepage.png
│   │   ├── 02-collections.png
│   │   ├── 03-product-detail.png
│   │   └── 04-checkout.png
│   ├── DESIGN-TOKENS-STITCH.md # Color palettes, fonts & spacing from Stitch
│   └── stitch-project.json     # Project metadata from Google Stitch
│
├── public/                     # Static files served directly by the server
│   ├── favicon.svg             # Website tab icon (Z monogram)
│   └── products/               # (Optional) Folder where you can drop your clothes photos
│
├── src/                        # The live React website application code
│   ├── assets/                 # Images, SVGs, and graphics used by components
│   │   ├── icons/              # Custom brand icons (Instagram, Twitter, YouTube)
│   │   └── images/             # Atelier & campaign imagery
│   │
│   ├── components/             # Reusable UI building blocks
│   │   ├── cart/               # Cart slide-over drawer
│   │   │   └── CartDrawer.tsx  # Slide-out bag with quantity buttons & checkout link
│   │   ├── layout/             # Shared page chrome
│   │   │   ├── Footer.tsx      # Footer with newsletter, links, social icons
│   │   │   ├── Layout.tsx      # Main layout wrapper (Navbar + Page + Footer)
│   │   │   └── Navbar.tsx      # Header with announcement bar, links, bag, search
│   │   └── ui/                 # Small reusable UI widgets
│   │       ├── Accordion.tsx   # Expandable product details / care tabs
│   │       ├── Logo.tsx        # 'ZAMYAA by jyoti' wordmark logo component
│   │       ├── ProductCard.tsx # Garment card with photo hover, quick-add, wishlist
│   │       ├── SearchOverlay.tsx # Fullscreen live product search modal
│   │       └── SocialIcons.tsx # Clean SVG icons for Instagram, Twitter, YouTube
│   │
│   ├── data/                   # Product catalog and data store
│   │   └── products.ts         # ⭐ WHERE TO ADD/EDIT CLOTHES, PRICES, & SIZES ⭐
│   │
│   ├── lib/                    # Helper utilities
│   │   └── utils.ts            # Formatting functions (currency formatting, class merge)
│   │
│   ├── pages/                  # The 7 main pages of the website
│   │   ├── AboutPage.tsx       # Founder Jyoti story, Craft Map, Timeline
│   │   ├── CartPage.tsx        # Dedicated full-page shopping bag view
│   │   ├── CheckoutPage.tsx    # 5-step luxury checkout (Contact, Shipping, Payment)
│   │   ├── CollectionsPage.tsx # Collections catalog with filter & sort bar
│   │   ├── ContactPage.tsx     # Atelier concierge contact form & studio addresses
│   │   ├── HomePage.tsx        # Homepage (Hero carousel, marquee, new arrivals)
│   │   ├── NotFoundPage.tsx    # 404 error page ("Piece wandered off the runway")
│   │   └── ProductPage.tsx     # Garment detail page with photo gallery, sizes, cart
│   │
│   ├── store/                  # State management (Zustand)
│   │   └── index.ts            # Cart, Wishlist, Search, and Dark/Light Mode state
│   │
│   ├── types/                  # TypeScript data types
│   │   └── index.ts            # Data models for Product, Cart, Collection, Checkout
│   │
│   ├── App.css                 # Secondary CSS reset
│   ├── App.tsx                 # Route declarations (linking URLs to pages)
│   ├── index.css               # Tailwind CSS v4 styling & Editorial Monolith theme
│   └── main.tsx                # React application entry point
│
├── dist/                       # Production build output (generated on 'npm run build')
├── HOW_TO_ADD_CLOTHES.md       # Step-by-step instructions for adding new clothes
├── PROJECT_STRUCTURE.md        # This file (explaining every directory)
├── index.html                  # Main HTML entry file with Google Fonts
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript compiler configuration
└── vite.config.ts              # Vite build tool and Tailwind CSS setup
```

---

## Where Should I Go When I Want To...

| Task | File to Open |
| :--- | :--- |
| **Add a new dress, saree, or kurta** | [`src/data/products.ts`](./src/data/products.ts) |
| **Change garment photos** | Put images in `public/products/` and reference in `products.ts` |
| **Edit the story about Jyoti** | [`src/pages/AboutPage.tsx`](./src/pages/AboutPage.tsx) |
| **Change shipping charges or rules** | [`src/store/index.ts`](./src/store/index.ts) or [`src/pages/CheckoutPage.tsx`](./src/pages/CheckoutPage.tsx) |
| **Change studio address or phone number** | [`src/pages/ContactPage.tsx`](./src/pages/ContactPage.tsx) & [`src/components/layout/Footer.tsx`](./src/components/layout/Footer.tsx) |
| **Change site colors or fonts** | [`src/index.css`](./src/index.css) |
| **View original Stitch design exports** | [`design-reference/`](./design-reference/) |

