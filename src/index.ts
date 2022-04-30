import { execSync, spawnSync, SpawnSyncReturns } from "child_process";
import parse from "parse-git-config";
import consola from "consola";
import { appendFileSync, existsSync, mkdirSync, writeFileSync } from "fs";

// https://git-scm.com/docs/githooks
const hooksArray = [
  "applypatch-msg",
  "pre-applypatch",
  "post-applypatch",
  "pre-commit",
  "pre-merge-commit",
  "prepare-commit-msg",
  "commit-msg",
  "post-commit",
  "pre-rebase",
  "post-checkout",
  "post-merge",
  "pre-push",
  "pre-receive",
  "update",
  "proc-receive",
  "post-receive",
  "post-update",
  "reference-transaction",
  "push-to-checkout",
  "pre-auto-gc",
  "post-rewrite",
  "sendemail-validate",
  "fsmonitor-watchman",
  "p4-changelist",
  "p4-prepare-changelist",
  "p4-post-changelist",
  "p4-pre-submit",
  "post-index-change",
] as const;

export type hooksName = typeof hooksArray[number];

const git = (args: string[]): SpawnSyncReturns<Buffer> =>
  spawnSync("git", args, { stdio: "inherit" });

export function install(dir = ".hooks", saveScript: boolean | string) {
  try {
    // Modify the git hooks directory.
    git(["config", "core.hooksPath", dir]);

    if (saveScript) {
      typeof saveScript == "string" ? saveScript : (saveScript = "postinstall");
      dir == ".hooks"
        ? execSync(`npm set-script ${saveScript} "hooks install"`)
        : execSync(`npm set-script ${saveScript} "hooks install ${dir}"`);
    }

    // Create a folder for git hooks.
    mkdirSync(dir, { recursive: true });

    consola.success(`Git hooks are installed in the ${dir} directory.`);
  } catch (error) {
    consola.error(error);
  }
}

export function init(hooks: hooksName, script?: string) {
  const hooksPath = parse.sync().core.hooksPath;

  try {
    if (!hooksPath) {
      consola.error(
        `Git hooks are not installed (try running hooks install [dir]).`
      );
    } else if (!existsSync(hooksPath)) {
      consola.error(
        `${hooksPath} directory doesn't exist (try running hooks install [dir]).`
      );
    } else if (!hooksArray.includes(hooks)) {
      consola.error(
        `The ${hooks} are unknown git hooks, you can see more details at https://git-scm.com/docs/githooks.`
      );
    } else {
      script
        ? writeFileSync(`${hooksPath}/${hooks}`, `#!/bin/sh\n${script}`, {
            mode: 0o0755,
          })
        : writeFileSync(`${hooksPath}/${hooks}`, `#!/bin/sh`, {
            mode: 0o0755,
          });

      consola.success("Git hooks initialized successfully.");
    }
  } catch (error) {
    consola.error(error);
  }
}

export function add(hooks: hooksName, script: string) {
  const hooksPath = parse.sync().core.hooksPath;

  try {
    if (!hooksPath) {
      consola.error(
        `Git hooks are not installed (try running hooks install [dir]).`
      );
    } else if (!existsSync(hooksPath)) {
      consola.error(
        `${hooksPath} directory doesn't exist (try running hooks install [dir]).`
      );
    } else if (!existsSync(`${hooksPath}/${hooks}`)) {
      consola.error(
        `Git hooks are not initialized, ${hooksPath} directory doesn't exist (try running hooks init ${hooks} [command]).`
      );
    } else {
      appendFileSync(`${hooksPath}/${hooks}`, `\n${script}`);
      consola.success("Git hooks add command successfully.");
    }
  } catch (error) {
    consola.error(error);
  }
}

export function uninstall() {
  try {
    // Reset the git hooks directory to its default value.
    git(["config", "--unset", "core.hooksPath"]);
    consola.success("Git hooks are uninstalled.");
  } catch (error) {
    consola.error(error);
  }
}
