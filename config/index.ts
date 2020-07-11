import defaultConfig from "./defaultConfig";
import brandConfigs from "./brandConfigs";

const id = process.env.ID;
const brandConfig = brandConfigs.find((config) => config.id === id) || {};

export default { ...defaultConfig, ...brandConfig };
