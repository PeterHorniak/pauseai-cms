import * as DarkReader from "darkreader";
import CMS from "decap-cms-app";
import darkreaderOverrides from "./darkreader-overrides.css?inline";
import { registerPlugin as registerDecapPrettier } from "./decap-prettier";
import { registerPlugin as registerDecapSlug } from "./decap-slug";

const DEBUG = true

if (DEBUG) addEventListener('message', event => console.log('message', event.data))

registerDecapPrettier(CMS, {});
registerDecapSlug();
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
