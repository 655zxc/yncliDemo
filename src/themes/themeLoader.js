const path = require("path");
const ynP1ModifyVars = require(path.join(
  __dirname,
  "../../node_modules/yn-p1/libs/themes/systemModifyVars"
));
const systemModifyVars = require(path.join(__dirname, "systemModifyVars"));

const customModifyVars = require(path.join(
  __dirname,
  "../custom/config/theme/modifyVars"
));

module.exports = {
  ...ynP1ModifyVars,
  ...systemModifyVars,
  ...customModifyVars
};
