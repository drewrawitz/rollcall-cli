const dateTime = require("node-datetime");

module.exports = (data, config) => {
  let dt = dateTime.create();
  let formattedTime = dt.format("m/d/y");
  let extra = "";
  let yesterday = "";

  function pbcopy(data) {
    var proc = require("child_process").spawn("pbcopy");
    proc.stdin.write(data);
    proc.stdin.end();
  }

  if (data.blockers) {
    extra = `> (B) ${data.blockers}`;
  }

  if (data.reminders) {
    extra += data.blockers ? "\n" : "";
    extra += `> (R) ${data.reminders}`;
  }

  if (!data.blockers && !data.reminders) {
    extra = "None";
  }

  if (typeof config.get("yesterday") !== "undefined") {
    yesterday = `\n*Yesterday:*
${config.get("yesterday")}
`;
  }

  let template = `${formattedTime} #rollcall
*Where:*
> ${data.location}
${yesterday}
*Today:*
${data.tasks}

*Blockers (B) / Reminders (R)*
${extra}

*Hours:*
> ${data.hours}
`;

  pbcopy(template);
  console.log("Rollcall copied to clipboard.");
};
