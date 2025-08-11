import fs from "fs";
import path from "path";
import { DatabaseShape, Identifier } from "../types";

const DATA_FILE_PATH = path.resolve(__dirname, "..", "..", "db.json");

export function loadDatabase(): DatabaseShape {
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
    return { 
      users: [], 
      products: [], 
      posts: [], 
      professionals: [] 
    };
  }
}

export function getNextId<T extends { id: Identifier }>(items: T[]): Identifier {
  if (items.length === 0) return 1;
  const maxId = Math.max(...items.map(item => item.id));
  return maxId + 1;
}

export function loadCollection<T>(collectionName: keyof DatabaseShape): T[] {
  const db = loadDatabase();
  return db[collectionName] as T[];
}

export function saveToDatabase(data: Partial<DatabaseShape>): boolean {
  try {
    const currentDb = loadDatabase();
    const updatedDb = { ...currentDb, ...data };
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(updatedDb, null, 2));
    return true;
  } catch (_err) {
    return false;
  }
}

export function updateCollectionInMemory<T extends { id: Identifier }>(collection: T[], item: T): T[] {
  const index = collection.findIndex(existing => existing.id === item.id);
  if (index === -1) {
    collection.push(item);
  } else {
    collection[index] = item;
  }
  return collection;
}

export function removeFromCollection<T extends { id: Identifier }>(collection: T[], id: Identifier): boolean {
  const index = collection.findIndex(item => item.id === id);
  if (index === -1) return false;
  
  collection.splice(index, 1);
  return true;
}

export function findById<T extends { id: Identifier }>(collection: T[], id: Identifier): T | undefined {
  return collection.find(item => item.id === id);
}

export function existsById<T extends { id: Identifier }>(collection: T[], id: Identifier): boolean {
  return collection.some(item => item.id === id);
}
