import { config } from "./deps.ts";

if (!Deno.env.get("ENVIRONMENT")) {
  config({ safe: true, export: true });
}
