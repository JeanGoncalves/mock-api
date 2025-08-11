import fs from "fs";
import path from "path";
import { DatabaseShape, Identifier } from "./types";

const DATA_FILE_PATH = path.resolve(__dirname, "..", "db.json");

function loadDatabase(): DatabaseShape {
  try {
    const raw = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      products: Array.isArray(parsed.products) ? parsed.products : [],
      posts: Array.isArray(parsed.posts) ? parsed.posts : [],
      professionals: Array.isArray(parsed.professionals) ? parsed.professionals : [],
    } as DatabaseShape;
  } catch (_err) {
    return { users: [], products: [], posts: [], professionals: [] };
  }
}

export const db: DatabaseShape = loadDatabase();

export function getNextId<T extends { id: Identifier }>(items: T[]): Identifier {
  if (items.length === 0) return 1;
  return Math.max(...items.map((i) => i.id)) + 1;
}


