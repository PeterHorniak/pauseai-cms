import styles from "./logo.css?inline";

export function registerPlugin(config: {
  width: string;
  supportDarkMode: true;
  darkSelector: string;
}): void;
export function registerPlugin(config: {
  width: string;
  supportDarkMode: false;
}): void;
export function registerPlugin(config: { width: string }): void;
export function registerPlugin(config: {
  width: string;
  supportDarkMode?: boolean;
  darkSelector?: string;
}) {
  const observer = new MutationObserver(() => {
    const nav = document.querySelector("nav");
    if (!nav) return;
    if (nav.querySelector(".custom-logo")) return;
    const logo = document.createElement("a");
    logo.href = "/#/";
    logo.className = "custom-logo";
    const ul = nav.querySelector("ul");
    const li = document.createElement("li");
    li.appendChild(logo);
    ul.insertBefore(li, ul.firstChild);
  });

  observer.observe(document.body, { childList: true, subtree: true });

  const sheet = new CSSStyleSheet();
  sheet.replaceSync(styles);
  sheet.insertRule(`.custom-logo { width: ${config.width}; }`);
  if (config.supportDarkMode && config.darkSelector) {
    sheet.insertRule(
      `${config.darkSelector} { --logo-url: url("/logo-dark.svg"); }`
    );
  }
  document.adoptedStyleSheets.push(sheet);
}
