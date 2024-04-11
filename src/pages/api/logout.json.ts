import type { APIContext, APIRoute } from "astro";
import { lucia } from "@/auth";

export const prerender = false;

export const POST: APIRoute = async (context:APIContext) => {
  
    console.log(context.locals.session)
    if(!context.locals.session){
        return new Response(null, {status:401})
    }

    await lucia.invalidateSession(context.locals.session.id)
    const sessionCookie = lucia.createBlankSessionCookie()
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

  return new Response(
    JSON.stringify({
      message: "Success",
    })
  );
};
