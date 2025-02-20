import { initializeServer, startServer } from "./server";
import { Item } from "./modules/Items/model/Item";
import { DataSource } from "typeorm";

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

startServer();
