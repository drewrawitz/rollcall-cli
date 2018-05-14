const menus = {
  main: `
    rollcall [command] <options>

    new ................ create a new rollcall entry for today
    location ........... show the location you currently have set
    yesterday........... show yesterdays tasks 
    version ............ show package version
    help ............... show help menu for a command`,

  yesterday: `
    rollcall location <options>

    --clear, ..... clear yesterdays entry`,

  location: `
    rollcall location <options>

    --set, ..... your new location,
    
    example: rollcall location --set="Remote (Raleigh, NC)"`
};

module.exports = args => {
  const subCmd = args._[0] === "help" ? args._[1] : args._[0];

  console.log(menus[subCmd] || menus.main);
};
