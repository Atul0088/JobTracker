import app from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";

async function startServer(): Promise<void> {
  await connectDatabase();

  app.get("/", (_req, resp) => {
    resp.send("Hello World!");
  });

  app.listen(env.PORT, () => {
    console.log(`🚀 JobTrack API running on http://localhost:${env.PORT}`);
  });
}

startServer();
