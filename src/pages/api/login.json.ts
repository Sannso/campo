import type { APIRoute } from "astro";
import { db, Users } from "astro:db";
import { Argon2id } from "oslo/password";
import { eq } from "astro:db";
import { lucia } from "@/auth";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const data = await request.formData();
  const email = data.get("email")!.toString();
  const password = data.get("password")!.toString();

  // Manejar y validar la informacion

  //Search user
  const foundUser = (
    await db.select().from(Users).where(eq(Users.email, email))
  ).at(0);

  if (typeof email !== "string") {
    return new Response(
      JSON.stringify({
        message: "El correo no es valido.",
      })
    );
  } else if (!foundUser) {
    return new Response(
      JSON.stringify({
        message: "Aun no estas registrado.",
      })
    );
  }

  // check password of this user
  const validPassword = await new Argon2id().verify(
    foundUser!.password,
    password
  );
  if (typeof password !== "string" || password.length < 6 || !validPassword) {
    return new Response(
      JSON.stringify({
        message: "La contraseña no es correcta.",
      })
    );
  }

  // Generate Session
  const session = await lucia.createSession(foundUser!.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return new Response(
    JSON.stringify({
      message: "Success",
    })
  );
};
