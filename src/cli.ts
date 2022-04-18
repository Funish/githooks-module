import cac from "cac";
import consola from "consola";
import { readFileSync } from "fs";
import { add, hooksName, init, install, uninstall } from "./index";

const cli = cac("hooks");
const { version } = JSON.parse(readFileSync("package.json", "utf8"));

// Listen to unknown commands
cli.on("command:*", () => {
  consola.error("Invalid command: %s", cli.args.join(" "));
  process.exit(1);
});

cli
  .command("install [dir]", "Install Git hooks.")
  .alias("i")
  .option(
    "-S, --save-script [script]",
    "Git hooks will be called during the post-install phase of the lifecycle."
  )
  .action((dir, options) => {
    install(dir, options.saveScript);
  });

cli
  .command(
    "init <hooks> [script]",
    "Initialize Git hooks, you can see more details at https://git-scm.com/docs/githooks."
  )
  .action((hooks: hooksName, script?: string) => {
    script ? init(hooks, script) : init(hooks);
  });

cli
  .command("add <hooks> <script>", "Add a script to an existing git hook.")
  .action((hooks: hooksName, script: string) => {
    add(hooks, script);
  });

cli
  .command("uninstall", "Uninstall Git hooks.")
  .alias("un")
  .action(() => {
    uninstall();
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
