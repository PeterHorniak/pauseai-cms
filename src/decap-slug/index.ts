import hideSlugFieldCss from "./hide-slug-field.css?inline";
import hideOptionalLabelCss from "./hide-optional-label.css?inline";

const NEW_POST_PATH_REGEX = /(?<!\/entries)\/new$/;

const hideFieldStyle = new CSSStyleSheet();
hideFieldStyle.replaceSync(hideSlugFieldCss);

const hideLabelStyle = new CSSStyleSheet();
hideLabelStyle.replaceSync(hideOptionalLabelCss);

export function registerPlugin() {
  document.adoptedStyleSheets.push(hideFieldStyle);
  document.adoptedStyleSheets.push(hideLabelStyle);
  hideSlugFieldForEditing();
  addEventListener("popstate", () => {
    hideSlugFieldForEditing();
  });
}

function hideSlugFieldForEditing() {
  hideFieldStyle.disabled = NEW_POST_PATH_REGEX.test(location.hash);
}
