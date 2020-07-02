import defaultConfig from "./config.default";

function localConfig() {
  try {
    return require("./config.local");
  } catch (e) {
    return {};
  }
}

export default { ...defaultConfig, ...localConfig() };
