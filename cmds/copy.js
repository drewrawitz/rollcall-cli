const pbcopy = require("../utils/pbcopy");

module.exports = (args, config) => {
  function printRollcall() {
    const rollcall = config.get("rollcall");
    if (rollcall) {
      pbcopy(rollcall);
    } else {
      console.log("You haven't set a rollcall! Run `rollcall new`");
    }
  }

  printRollcall();
};
