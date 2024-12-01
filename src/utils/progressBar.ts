import CliProgress, { type SingleBar } from "cli-progress";

export const progressBar = new CliProgress.MultiBar({
  clearOnComplete: false,
  hideCursor: true,
  format: " {bar} | {task} | {value}/{total}",
});

export const addProgressBar: (size: number, name: string) => SingleBar = (
  size,
  name,
) => progressBar.create(size, 0, { task: name });

export const progressComplete = () => progressBar.stop();
