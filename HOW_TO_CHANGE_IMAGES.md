# How to Change Images on ZAMYAA (Clean, Simplified Guide)

We have cleaned up the entire image structure so that you **never** have to dig through messy code files again. All image paths are now organized into **one single place**.

---

## 📁 Clean Image Folder Structure

All your website images now live in one clean, obvious directory:

```
public/images/
├── models/
│   ├── lantana-hero-models.jpg   ← (Photo 1: The two girls full look)
│   ├── lantana-detail-hues.jpg   ← (Photo 2: Close-up of lace & soft hues)
│   └── lantana-shoot-grid.jpg    ← (Photo 3: 32-shot garden contact sheet)
├── lantana/
│   └── ...
└── products/
    └── ...
```

A copy is also kept in `src/assets/images/` for local asset bundling.

---

## 🛠️ The 3 Easy Ways to Change Images

### Method 1: Zero-Code (Easiest — Just Replace the File)

If you have a new photo and want it to replace one of the girls' photos:

1. Rename your new photo to:
   - `lantana-hero-models.jpg` (to replace the main 3D hero model of the girls)
   - `lantana-detail-hues.jpg` (to replace the close-up lace photo)
   - `lantana-shoot-grid.jpg` (to replace the lookbook grid photo)
2. Drag and drop it into:
   ```
   public/images/models/
   ```
3. **Done!** The website, homepage 3D model, and lookbooks update immediately.

---

### Method 2: Change Links in One Central File (`src/config/images.ts`)

If your image is hosted online (Cloudinary, AWS, Google, or any web link), you do **not** need to search through 10 files. Open **`src/config/images.ts`**:

```typescript
// Open: src/config/images.ts

export const siteImages = {
  models: {
    // Paste your new URL here:
    heroGirls: 'https://your-new-image-link.com/photo.jpg',
    detailHues: 'https://your-new-image-link.com/detail.jpg',
    shootGrid: 'https://your-new-image-link.com/grid.jpg',
  },
  // ...
}
```

Save the file. **Every page on the site will automatically use your new link!**

---

### Method 3: Change Product Photos from the Admin Portal (For Jyoti)

Jyoti can also change product photos without touching any files:
1. Go to `http://localhost:5173/admin`
2. Log in (`admin@zamyaa.in` / `admin`)
3. Click **Products** → **Edit** on any dress.
4. Drag & drop photos into the Cloudinary upload box and click **Update Product**.
