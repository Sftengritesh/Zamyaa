# How Jyoti Manages ZAMYAA (Visual Admin Dashboard & Catalog Guide)

Jyoti does **not** need a developer every time she wants to:
- Add a new dress or couture piece.
- Upload product photographs from her phone or computer.
- Change a dress price, discount, or badge.
- Mark an outfit or size as "Sold Out" or restock it.
- Launch a new festive collection capsule.
- Edit homepage banners, hero headlines, or change promo announcements.
- Track client orders, enter courier tracking numbers, and view customer purchase history.

Everything can be done directly from the **ZAMYAA Luxury Admin Portal**.

---

## 1. Accessing the Admin Portal

1. Open your browser and go to:
   ```
   http://localhost:5173/admin
   ```
   *(Or your production domain: `https://your-domain.com/admin`)*

2. **Default Login Credentials**:
   - **Email**: `admin@zamyaa.in`
   - **Password**: `admin`

3. Once logged in, you enter the black-and-white editorial atelier command center.

---

## 2. How to Add a New Outfit in 60 Seconds

1. Click **Products** in the sidebar (or click the black **+ New Garment** button on the top right).
2. Click **+ Add New Garment**.
3. Fill in the garment details:
   - **Garment Name**: e.g., *The Noorani Velvet Angrakha*
   - **Subtitle / Capsule**: e.g., *Noor-e-Rang Festive Edit*
   - **Collection**: Select from dropdown (*Noor-e-Rang*, *Lantana*, *Boho Flare*, *Affaire*, *Desi Dastaan*)
   - **Price (₹)**: e.g., `48500` (enter pure numbers; currency formatting `₹` is automatic)
   - **Original Price (₹)**: (Optional, for strikethrough sale price)
   - **Badge**: e.g., *Exclusive*, *New Season*, *Limited*, *Bestseller*
4. **Upload Photographs**:
   - Drag and drop your high-resolution garment photographs into the Cloudinary upload box, or click **Browse Files**.
   - Your photos are automatically processed and hosted on Cloudinary CDN at blazing speed.
   - You can mark which photo is the **Primary / Cover** image.
5. **Select Available Sizes & Colors**:
   - Check off sizes: `XS`, `S`, `M`, `L`, `XL`, `Custom Bespoke`.
   - Add your fabric colors with custom hex codes or color names.
6. **Description, Craftsmanship & Care**:
   - Enter the couture storytelling, handloom weave notes, and dry-clean care instructions.
7. Click **Publish Piece to Storefront**.
   - Your outfit goes live instantly on the customer website and in its matching collection!

---

## 3. How to Change a Price or Edit a Product

1. Go to **Products** in the sidebar.
2. Search for the dress name or filter by collection.
3. Click the **Edit** button next to the piece.
4. Update the price, photos, or description.
5. Click **Update Product**. Changes reflect live immediately.

---

## 4. How to Manage Stock & Mark "Sold Out"

1. Click **Inventory** in the sidebar.
2. You will see every garment variant (e.g., *Gulabi Silk Co-Ord — Size S*).
3. Use the **+** and **-** buttons to adjust artisan stock units.
4. Need to pause sales immediately? Click the **Mark Sold Out** button.
5. Made a fresh atelier batch? Click **Restock (10)** to bring it back in stock with 1 click.

---

## 5. How to Launch a New Collection

1. Click **Collections** in the sidebar.
2. Click **+ New Collection**.
3. Enter the Title (e.g., *Mehraab Autumn Couture*), Season tag (*Festive 2026*), Description, and upload a stunning hero banner.
4. Click **Create Collection**.
5. When ready to reveal to the public, toggle **Published: Yes**.

---

## 6. How to Manage Customer Orders & Courier Tracking

1. Click **Orders** in the sidebar.
2. Filter orders by **Pending**, **Processing**, **Shipped**, or **Delivered**.
3. Click on any order to view:
   - Client name, email, phone number.
   - Shipping address and city.
   - Ordered pieces, sizes, quantities, and payment status.
4. **Fulfill & Ship**:
   - Change status to `Shipped`.
   - Enter the **Courier Partner** (e.g., *BlueDart / Shiprocket / DTDC*).
   - Enter the **Airway Bill (AWB) / Tracking Number**.
   - The tracking details are saved to the client's order record.

---

## 7. How to Update Homepage Banners & Announcement Bar

1. Click **Homepage CMS** in the sidebar.
2. **Announcement Bar**:
   - Toggle on/off.
   - Edit the marquee text: e.g., *"Complimentary express couture delivery on all domestic orders above ₹15,000"*.
3. **Hero Banner**:
   - Change the headline, sub-headline, and season badges.
   - Upload a new seasonal cover photograph.
4. **Promotional Banner**:
   - Update mid-page seasonal campaign banners.
5. **Section Visibility**:
   - Toggle visibility of Craft Pillars, Editorial Feature, Instagram feed, or Newsletter with one switch.
6. Click **Save Homepage CMS**.

---

## 8. How to Create Discount Coupons

1. Click **Discounts** in the sidebar.
2. Click **+ Create Coupon**.
3. Choose **Percentage** (e.g., `15% off`) or **Fixed Amount** (e.g., `₹5,000 off`).
4. Set Minimum Order Value and Expiration Date.
5. Click **Activate Coupon**. Customers can now apply this code at checkout!

---

## 9. How to Update Store Settings & Contact Info

1. Click **Store Settings** in the sidebar.
2. You can update:
   - WhatsApp Concierge phone number.
   - Atelier addresses for Mumbai and Jaipur.
   - Standard shipping fee (default `₹495`) and free shipping threshold (default `₹15,000`).
   - GST apparel tax rate (default `12%`).
   - Return window (default `7 days`).
   - Instagram and YouTube links.
3. Click **Save Settings**.

---

## 10. Developer Fallback (Optional Code Editing)

If a developer ever wishes to modify seed files or code defaults directly:
- **Product Seeds**: [`server/src/db/store.ts`](./server/src/db/store.ts) and [`src/data/products.ts`](./src/data/products.ts)
- **Live Database File**: [`server/data/db.json`](./server/data/db.json)
- **Cloudinary Config**: [`server/src/config/cloudinary.ts`](./server/src/config/cloudinary.ts)
