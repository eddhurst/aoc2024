import { sample } from "./prompts/2.sample";
import { prompt } from "./prompts/2.prompt";
import { logResult } from "../utils/log";
import { processInput } from "./processInput";

const validate: (report: number[]) => boolean = (report) => {
  const direction = Math.sign(report[0] - report[1]);

  let valid = false;
  for (let i = 0; i < report.length; i++) {
    if (report[i] === report[i + 1]) {
      valid = false;
      break;
    }

    if (
      (report[i] < report[i + 1] && direction == 1) || // bigger but expecting descending
      (report[i] > report[i + 1] && direction == -1) // smaller but expecting ascending
    ) {
      valid = false;
      break;
    }

    const diff = Math.abs(report[i] - report[i + 1]);
    if (diff < 1 || diff > 3) {
      valid = false;
      break;
    }

    valid = true;
  }

  return valid;
};

const run = (input: string) => {
  const reports = processInput(input);

  return reports.reduce((safeAcc, report) => {
    if (validate(report)) {
      return safeAcc + 1;
    }

    // Try again with each index removed to see if that is the problem.
    for (let i = 0; i < report.length; i++) {
      const newReport = report.toSpliced(i, 1);
      if (validate(newReport)) {
        return safeAcc + 1;
      }
    }

    return safeAcc;
  }, 0);
};

const result = run(prompt);

logResult(result);
