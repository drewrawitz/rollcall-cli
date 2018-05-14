module.exports = (args, config) => {
  const set = args.set;

  function printLocation() {
    console.log(`Location is set to: ${config.get("location")}`);
  }

  if (set) {
    config.set("location", set);
  }

  printLocation();
};
