module.exports = (args, config) => {
  const clear = args.clear;

  function printYesterday() {
    if (config.get("yesterday")) {
      console.log(`Yesterdays tasks:\n${config.get("yesterday")}`);
    } else {
      console.log("You don't have any tasks from yesterday");
    }
  }

  if (clear) {
    config.delete("yesterday");
  }

  printYesterday();
};
