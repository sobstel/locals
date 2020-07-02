import defaultConfig from "./config.default";

function localConfig() {
  try {
    return import("./config.local");
  } catch (e) {
    return {};
  }
}

export default { ...defaultConfig, ...localConfig() };
