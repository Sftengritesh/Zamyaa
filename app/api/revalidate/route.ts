import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * Sanity webhook endpoint for on-demand ISR
 * When content is published in Sanity, this revalidates the affected pages
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { _type, slug } = body;

    // Revalidate based on content type
    switch (_type) {
      case "product":
        revalidatePath("/");
        revalidatePath("/collections");
        if (slug?.current) {
          revalidatePath(`/products/${slug.current}`);
        }
        break;
      case "collection":
        revalidatePath("/");
        revalidatePath("/collections");
        if (slug?.current) {
          revalidatePath(`/collections/${slug.current}`);
        }
        break;
      case "banner":
        revalidatePath("/");
        break;
      case "siteSettings":
        revalidatePath("/", "layout");
        break;
      default:
        revalidatePath("/");
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
