const Conf = require("conf");
const minimist = require("minimist");
const error = require("./utils/error");
const pkg = require("./package.json");

module.exports = () => {
  const config = new Conf();
  const args = minimist(process.argv.slice(2));

  let cmd = args._[0] || "help";

  if (args.version || args.v) {
    cmd = "version";
  }

  if (args.help || args.h) {
    cmd = "help";
  }

  switch (cmd) {
    case "new":
      require("./cmds/new")(args, config);
      break;

    case "location":
      require("./cmds/location")(args, config);
      break;

    case "version":
      require("./cmds/version")(args);
      break;

    case "help":
      require("./cmds/help")(args);
      break;

    default:
      error(`"${cmd}" is not a valid command!`, true);
      break;
  }
};
