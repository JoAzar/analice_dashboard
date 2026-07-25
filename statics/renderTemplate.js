import { components } from "./components.js";

export function renderTemplate(html, config) {
  return html.replace(/@construir\.modulo\.(\w+)(\{.*?\})?/g, (match, name, props) => {
    const comp = components[name];
    if (!comp) return "";

    let parsedProps = {};
    if (props) {
      try {
          parsedProps = JSON.parse(props);
      } catch(e) {}
    }
    return comp(parsedProps);
  });
}