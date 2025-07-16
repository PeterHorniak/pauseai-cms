import styleDisabledInputCss from "./style-disabled-input.css?inline";
import hideOptionalLabelCss from "./hide-optional-label.css?inline";

const NEW_POST_PATH_REGEX = /(?<!\/entries)\/new$/;

const styleDisabledInputStyle = new CSSStyleSheet();
styleDisabledInputStyle.replaceSync(styleDisabledInputCss);

const hideOptionalLabelStyle = new CSSStyleSheet();
hideOptionalLabelStyle.replaceSync(hideOptionalLabelCss);

export function registerPlugin() {
  document.adoptedStyleSheets.push(styleDisabledInputStyle);
  document.adoptedStyleSheets.push(hideOptionalLabelStyle);
  observeSlugFieldForCustomBehavior();
}

function observeSlugFieldForCustomBehavior() {
  const observer = new MutationObserver((mutationsList: MutationRecord[]) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        handleSlugFieldBehavior();
        return;
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function handleSlugFieldBehavior() {
  const slugFieldInput = document.querySelector(
    'input[id^="slug-field"]'
  ) as HTMLInputElement | null;
  if (!slugFieldInput) return;
  const location = window.location;
  const isNewEntry = NEW_POST_PATH_REGEX.test(location.hash);
  if (isNewEntry) {
    slugFieldInput.removeAttribute("disabled");
    slugFieldInput.removeAttribute("tabindex");
  } else {
    slugFieldInput.setAttribute("disabled", "true");
    slugFieldInput.setAttribute("tabindex", "-1");

    const pseudoPathParts = location.hash.split("/");
    const lastPseudoPathPart = pseudoPathParts[pseudoPathParts.length - 1];

    if (slugFieldInput.value === "") {
      slugFieldInput.placeholder = `${lastPseudoPathPart} (automatically inferred)`;
    }
  }
}
