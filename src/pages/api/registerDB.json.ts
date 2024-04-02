import type { APIRoute } from "astro";
import { db, Users, PersonalInfo } from "astro:db";
import { Argon2id } from "oslo/password";
import { eq } from "astro:db";
import { generateId } from "lucia";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  console.log(data);

  // Verificar si el usuario (email) existe ya en la base de datos
  const user = await db.select().from(Users).where(eq(Users.email, data.email));

  if (user.length > 0) {
    return new Response(
      JSON.stringify({
        message: "User Exist",
      })
    );
  }

  // Una vez verificado se llena la tabla de usuario y luego la de informacion personal
  const hashedPassword = await new Argon2id().hash(data.password);

  const uniqueUserID = generateId(15)
  await db
    .insert(Users)
    .values({id:uniqueUserID, email: data.email, password: hashedPassword });

  const userCreated = await db
    .select()
    .from(Users)
    .where(eq(Users.email, data.email));

  const uniquePersonalID = generateId(15)
  await db.insert(PersonalInfo).values({
    id: uniquePersonalID,
    userID: userCreated[0].id,
    name: data.name,
    firstName: data.firstName,
    lastName: data.lastName,
    type: data.type,
    cellphone: data.cellphone,
    cpIndicator: 57,
  });

  return new Response(
    JSON.stringify({
      message: "Success",
    })
  );
};
