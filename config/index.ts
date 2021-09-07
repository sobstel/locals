import defaultConfig from "./defaultConfig";
import brandConfigs from "./brandConfigs";

const id = 'niebanalna'; // process.env.ID;
const brandConfig = brandConfigs.find((config) => config.id === id) || {};

let localConfig;
try {
  localConfig = (require("./config.local") || {}).default;
} catch (e) {
  localConfig = {};
}

export default { ...defaultConfig, ...brandConfig, ...localConfig };
