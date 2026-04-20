import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    `${process.env.TMDB_BASE_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=ja-JP&page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  return NextResponse.json(data);
}
