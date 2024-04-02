import { Lucia } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db, Sessions, Users } from "astro:db";

const adapter = new DrizzleSQLiteAdapter(db as any, Sessions, Users); // your adapter

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: import.meta.env.PROD
		}
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}