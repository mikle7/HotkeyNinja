import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import path from "path";
import { promises as fs } from "fs";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getVsCodeKeyCombinations: publicProcedure.query(async ({ ctx }) => {
    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), "json");
    //Read the json data file data.json
    const fileContents = await fs.readFile(
      jsonDirectory + "/data.json",
      "utf8"
    );

    //Return the content of the data file in json format
    return JSON.parse(fileContents);
  }),
});
