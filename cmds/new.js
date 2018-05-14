const inquirer = require("inquirer");
const chalk = require("chalk");
const template = require("../utils/template");
const pbcopy = require("../utils/pbcopy");

module.exports = async (args, config) => {
  let tasks = [];

  const today = [
    {
      type: "input",
      name: "today",
      message: chalk.yellow("Today's tasks (enter 'done' when finished)")
    }
  ];

  var questions = [
    {
      type: "input",
      name: "location",
      message: "Location",
      when: function() {
        return typeof config.get("location") === "undefined";
      }
    },
    {
      type: "confirm",
      name: "blockers_boolean",
      message: "Blockers?",
      default: false
    },
    {
      type: "input",
      name: "blockers",
      message: "List Blockers",
      when: function(answers) {
        return answers.blockers_boolean === true;
      }
    },
    {
      type: "confirm",
      name: "reminders_boolean",
      message: "Reminders?",
      default: false
    },
    {
      type: "input",
      name: "reminders",
      message: "List Reminders",
      when: function(answers) {
        return answers.reminders_boolean === true;
      }
    },
    {
      type: "list",
      name: "hours",
      message: "Hours?",
      choices: ["Yes", "Not caught up"]
    }
  ];

  function tasksPrompt() {
    inquirer.prompt(today).then(answers => {
      if (answers.today !== "done") {
        if (answers.today.length > 0) {
          tasks.push("> " + answers.today);
        }
        tasksPrompt();
      } else {
        otherQuestions();
      }
    });
  }

  function otherQuestions() {
    inquirer.prompt(questions).then(answers => {
      if (!answers.location) {
        answers.location = config.get("location");
      } else {
        config.set("location", answers.location);
      }

      let todaysTasks = "";
      if (tasks.length > 0) {
        todaysTasks = tasks.join("\n");
      } else {
        todaysTasks = "No tasks for the day :eyes:";
      }

      answers.tasks = todaysTasks;

      const rollcall = template(answers, config);
      pbcopy(rollcall);

      // store today's rollcall so we can easily access it
      config.set("rollcall", rollcall);

      // store today's task as "yesterday" for tomorrows entry
      config.set("yesterday", todaysTasks);
    });
  }

  tasksPrompt();
};
