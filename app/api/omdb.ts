import type { OMDBResponse } from "@/types/omdb";
const OMDB_BASE_URL = process.env.OMDB_BASE_URL;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

async function fetchOMDB(
  imdbId: string,
  revalidate: number,
): Promise<OMDBResponse> {
  try {
    const res = await fetch(
      `${OMDB_BASE_URL}?i=${imdbId}&apikey=${OMDB_API_KEY}`,
      { next: { revalidate } },
    );
    if (!res.ok) {
      throw new Error(`IMDB API ERROR: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`error: ${error}`);
    throw error;
  }
}

// OMDB 映画情報取得
export async function getOMDBInfo(imdbId: string): Promise<OMDBResponse> {
  return fetchOMDB(imdbId, 3600);
}
