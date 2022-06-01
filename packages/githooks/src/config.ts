import { loadConfig } from "c12";

// https://git-scm.com/docs/githooks
const GithooksArray = [
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

export type GithooksName = typeof GithooksArray[number];

export interface GithooksConfig {
  path?: string;
  scripts?: {
    [key in GithooksName]?: string;
  };
  extends?: [string];
}

const ConfigDefaults: GithooksConfig = {
  path: ".githooks",
};

export async function loadGithooksConfig(
  cwd?: string,
  overrides?: Partial<GithooksConfig>
): Promise<GithooksConfig> {
  const { config } = await loadConfig<GithooksConfig>({
    name: "githooks",
    cwd,
    defaults: ConfigDefaults,
    overrides: overrides,
  });

  return config;
}

export function defineGithooksConfig(config: GithooksConfig) {
  return config;
}
