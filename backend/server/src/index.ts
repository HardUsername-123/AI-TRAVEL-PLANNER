import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { connectDB } from "./config/db.js";
import { cors } from "hono/cors";
import router from "./routes/userRoute.js";

const app = new Hono();

await connectDB();

app.get("/", (c) => {
  return c.text("Hello Hono! Im Anthony");
});

//middleware
app.use("*", cors());

app.route("/userAuth", router);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
