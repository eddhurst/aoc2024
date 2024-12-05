import sample from "./prompts/5.sample";
import prompt from "./prompts/5.prompt";
import { processPages, processRules } from "./processInput";

const rules = processRules(prompt);
const manuals = processPages(prompt);

const validManuals = manuals.reduce((acc, pages) => {
  let isValid = true;
  for (let i = 0; i < pages.length; i++) {
    const currentPage = pages[i];

    if (
      rules[currentPage] &&
      !rules[currentPage].every((rule) => {
        const ruleIndex = pages.indexOf(rule);
        const pageIndex = pages.indexOf(currentPage);

        return ruleIndex === -1 || ruleIndex > pageIndex;
      })
    ) {
      isValid = false;
      break;
    }
  }

  if (!isValid) {
    pages.sort((a, b) => {
      if (rules[a] && rules[a].includes(b)) {
        return -1;
      }
      return 1;
    });

    return acc + parseInt(pages[Math.round(pages.length / 2) - 1]);
  }

  return acc;
}, 0);

console.info(validManuals);
