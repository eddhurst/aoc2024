import chalk from "chalk";

const log: (message: string, type: "log" | "result") => void = (
  message,
  type = "log",
) => {
  switch (type) {
    case "result":
      console.log(chalk.blue("RESULT: ") + message);
      break;
    case "log":
    default:
      console.log(message);
      break;
  }

  console.log();
};
