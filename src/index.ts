import * as DarkReader from "darkreader";
import CMS from "decap-cms-app";
import darkreaderOverrides from "./darkreader-overrides.css?inline";
import { registerPlugin as registerDecapLogo } from "./decap-logo/index";
import { registerPlugin as registerDecapPrettier } from "./decap-prettier";
import { registerPlugin as registerDecapSlug } from "./decap-slug";
import { registerPlugin as registerDecapJsonDict } from "./decap-json-dict";

const DEBUG = false;

if (DEBUG)
  addEventListener("message", (event) => console.log("message", event.data));

registerDecapPrettier(CMS, {});
registerDecapSlug();
registerDecapLogo({
  width: "140px",
  supportDarkMode: true,
  darkSelector: "html[data-darkreader-scheme]",
});
registerDecapJsonDict(CMS);
CMS.registerCustomFormat("json", "json_tabs", {
  fromFile: (file) => JSON.parse(file),
  toFile: (data) => JSON.stringify(data, null, "\t"),
})
CMS.init();
DarkReader.auto(
  {
    darkSchemeTextColor: "white",
  },
  {
    css: darkreaderOverrides,
    invert: [],
    ignoreInlineStyle: [],
    ignoreImageAnalysis: [],
    disableStyleSheetsProxy: false,
  }
);
