import { defineDb } from "astro:db";
import { Users, Sessions } from "./usuario/loginInfo";

// https://astro.build/db/config
export default defineDb({
  tables: { Users, Sessions },
});
