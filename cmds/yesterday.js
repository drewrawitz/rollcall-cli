module.exports = (args, config) => {
  const clear = args.clear;
  let success = false;

  function printYesterday() {
    if (config.get("yesterday")) {
      console.log(`Yesterdays tasks:\n${config.get("yesterday")}`);
    } else {
      if (success) {
        console.log("Successfully cleared yesterdays tasks.");
      } else {
        console.log("You don't have any tasks from yesterday");
      }
    }
  }

  if (clear) {
    config.delete("yesterday");
    success = true;
  }

  printYesterday(success);
};
