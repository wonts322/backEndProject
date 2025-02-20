import { Request, Server } from "@hapi/hapi";
import { DataSource } from "typeorm";
import ItemRoutes from "./modules/Items/routes/ItemRoutes";

export const defineRoutes = (server: Server, dataSource: DataSource) => {
  const itemRoutes = new ItemRoutes(dataSource);

  server.route([
    {
      method: "GET",
      path: "/ping",
      handler: async (request: Request, h) => {
        return {
          ok: true,
        };
      },
    },
    ...itemRoutes.getAll(),
  ]);
};
