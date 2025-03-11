import type CMS from "decap-cms-app";
import type { Options as PrettierOptions } from "prettier";

export async function registerPlugin(
  cms: typeof CMS,
  prettierConfig: PrettierOptions
) {
  const { format } = await import("prettier/standalone");
  const markdownPlugin = await import("prettier/plugins/markdown");
  cms.registerEventListener({
    name: "preSave",
    handler: async ({ entry }) => {
      const data = entry.get("data");
      const body = data.get("body");
      const formatted = await format(body, {
        plugins: [markdownPlugin],
        parser: "markdown",
        ...prettierConfig,
      });
      return data.set("body", formatted);
    },
  });
}
