//import { Comment, db } from "astro:db";
import { Users, PersonalInfo, db } from "astro:db";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";

// https://astro.build/db/seed
export default async function seed() {
  const hashedPassword = await new Argon2id().hash(
    import.meta.env.ADMIN_PASSWORD
  );
  const uniqueUserID = generateId(20);
  await db.insert(Users).values({
    id: uniqueUserID,
    email: import.meta.env.ADMIN_EMAIL,
    password: hashedPassword,
  });

  const uniquePersonalID = generateId(20);
  await db.insert(PersonalInfo).values({
    id: uniquePersonalID,
    userID: uniqueUserID,
    name: "Santiago",
    firstName: "Sosa",
    lastName: "Herrera",
    type: "Admin",
    cellphone: 3046583960,
    cpIndicator: 57,
  });
}
