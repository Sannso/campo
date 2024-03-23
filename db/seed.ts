import { Comment, db } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Comment).values([{ author: "Santiago", body: "Funciona!" }, { author: "Bob", body: "Si Funciona 3!" }]);
}
