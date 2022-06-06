import cac from "cac";
import consola from "consola";
import { readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import type { GithooksName } from "./config";
import { githooksInstall, githooksSetup, githooksUninstall } from "./githooks";
import { githooksMigrateFromHusky } from "./githooks";

const cli = cac("githooks");
const moduleDir = fileURLToPath(new URL("../", import.meta.url));
const { version } = JSON.parse(
  readFileSync(resolve(moduleDir, "package.json"), "utf8")
);

// Listen to unknown commands
cli.on("command:*", () => {
  consola.error("Invalid command: %s", cli.args.join(" "));
  process.exit(1);
});

cli
  .command("install [path]", "Install Git hooks.")
  .alias("i")
  .option(
    "-S, --save-script [script]",
    "Git hooks will be called during the post-install phase of the lifecycle."
  )
  .action((path, options) => {
    githooksInstall(path, options.saveScript);
  });

cli
  .command("setup <hooks> [script]", "Set up Git hooks.")
  .action((hooks: GithooksName, script) => {
    githooksSetup(hooks, script);
  });

cli
  .command("uninstall", "Uninstall Git hooks.")
  .alias("un")
  .action(() => {
    githooksUninstall();
  });

cli
  .command("migrate", "Migrating from husky to @funish/githooks.")
  .action(() => {
    githooksMigrateFromHusky();
  });

// Display help message when `-h` or `--help` appears
cli.help();
// Display version number when `-v` or `--version` appears
// It's also used in help message
cli.version(version);

try {
  // Parse CLI args without running the command
  cli.parse(process.argv, { run: false });
  // Run the command yourself
  // You only need `await` when your command action returns a Promise
  await cli.runMatchedCommand();
} catch (error) {
  // Handle error here..
  // e.g.
  consola.error(error);
  process.exit(1);
}
