import { config } from "dotenv";

if (!Deno.env.get("ENVIRONMENT")) {
  config({ safe: true, export: true });
}
