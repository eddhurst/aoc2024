import chalk from "chalk";

type Log = (message: string | number, type: "log" | "result" | "test") => void;

const _log: Log = (message, type = "log") => {
  switch (type) {
    case "result":
      console.log(`\n${chalk.blue("RESULT:")} ${message}`);
      break;
    case "test":
      console.log(`${chalk.red("TESTING: ")} ${message}`);
      break;
    case "log":
    default:
      console.log(message);
      break;
  }
};

export const log = (message: string | number) => {
  _log(message, "log");
};

export const logResult = (message: string | number) => {
  _log(message, "result");
};

export const logTest = (testValue: unknown) => {
  let message = testValue;

  if (typeof message === "object") {
    message = "\n" + JSON.stringify(testValue, null, 2);
  }

  _log(message as string | number, "test");
};
