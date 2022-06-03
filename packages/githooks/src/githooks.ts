import { spawnSync, SpawnSyncReturns } from "child_process";
import consola from "consola";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  renameSync,
  writeFileSync,
} from "fs";
import type { GithooksName } from "./config";
import { loadGitConfig, loadGithooksConfig } from "./config";
import { saveScript } from "./script";

const git = (args: string[]): SpawnSyncReturns<Buffer> =>
  spawnSync("git", args, { stdio: "inherit" });

export async function githooksInstall(
  path?: string,
  isSaveScript?: boolean | string
) {
  const config = await loadGithooksConfig();
  const hooksPath =
    path || config.scripts ? ".git/hooks" : config.path || ".githooks";

  // Create a folder for git hooks.
  mkdirSync(hooksPath, { recursive: true });

  try {
    if (config.scripts) {
      let ConfigScript: GithooksName;
      for (ConfigScript in config.scripts) {
        writeFileSync(
          `${hooksPath}/${ConfigScript}`,
          `#!/bin/sh\n${config.scripts[ConfigScript]}`,
          {
            mode: 0o0755,
          }
        );
      }

      consola.success("Git hooks are set up successfully.");
    } else {
      git(["init"]);
      // Modify the git hooks directory.
      git(["config", "core.hooksPath", hooksPath]);

      if (isSaveScript) {
        typeof isSaveScript == "string"
          ? isSaveScript
          : (isSaveScript = "postinstall");
        path == ".githooks"
          ? saveScript(`${isSaveScript}`, "hooks install")
          : saveScript(`${isSaveScript}`, `hooks install ${hooksPath}`);
      }

      consola.success(`Git hooks are installed in the ${hooksPath} directory.`);
    }
  } catch (error) {
    consola.error(error);
  }
}

export function githooksSetup(hooks: GithooksName, script?: string) {
  const hooksPath = loadGitConfig().core.hooksPath || ".git/hooks";

  try {
    if (!hooksPath) {
      consola.error(
        `Git hooks are not installed (try running githooks install [dir]).`
      );
    } else if (!existsSync(hooksPath)) {
      consola.error(
        `The ${hooksPath} directory does not exist (try running githooks install [dir]).`
      );
    } else {
      script
        ? writeFileSync(`${hooksPath}/${hooks}`, `#!/bin/sh\n${script}`, {
            mode: 0o0755,
          })
        : writeFileSync(`${hooksPath}/${hooks}`, `#!/bin/sh`, {
            mode: 0o0755,
          });

      consola.success("Git hooks are set up successfully.");
    }
  } catch (error) {
    consola.error(error);
  }
}

export function githooksUninstall() {
  try {
    // Reset the git hooks directory to its default value.
    git(["config", "--unset", "core.hooksPath"]);
    consola.success("Git hooks are uninstalled.");
  } catch (error) {
    consola.error(error);
  }
}

export async function githooksMigrateFromHusky() {
  const config = await loadGithooksConfig();
  const hooksPath = loadGitConfig().core.hooksPath || config.path;

  try {
    if (config.scripts) {
      consola.error(
        "There are scripts in the configuration file that conflict with the husky migration process."
      );
    } else if (!existsSync(hooksPath) || readdirSync(hooksPath).length === 0) {
      renameSync(".husky", hooksPath);
      consola.success(
        "Migration is complete, after that please deal with any conflicts manually."
      );
    } else {
      consola.error(
        `The ${hooksPath} directory already exists, please try to migrate it manually.`
      );
    }
  } catch (error) {
    consola.error(error);
  }
}
