import { NextResponse } from "next/server";
import { db } from "db";
import { comments } from "db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const allComments = await db.query.comments.findMany({
      where: eq(comments.slug, slug),
      orderBy: [desc(comments.createdAt)],
    });
    return NextResponse.json(allComments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, username, content } = body;

    if (!slug || !username || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newComment = await db
      .insert(comments)
      .values({
        slug,
        username,
        content,
      })
      .returning();

    return NextResponse.json(newComment[0]);
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
