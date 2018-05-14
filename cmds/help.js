const menus = {
  main: `
    rollcall [command] <options>

    new ................ create a new rollcall entry for today
    location ........... show the location you currently have set
    version ............ show package version
    help ............... show help menu for a command`,

  location: `
    outside location <options>

    --set, ..... your new location,
    
    example: rollcall location --set="Remote (Raleigh, NC)"`
};

module.exports = args => {
  const subCmd = args._[0] === "help" ? args._[1] : args._[0];

  console.log(menus[subCmd] || menus.main);
};
