# @funish/githooks

![npm version](https://img.shields.io/npm/v/@funish/githooks)
![npm downloads](https://img.shields.io/npm/dw/@funish/githooks)
![npm license](https://img.shields.io/npm/l/@funish/githooks)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> Programmatically create git hooks, powered by Funish.

Inspired by [husky](https://github.com/typicode/husky) and with an extremely similar implementation, but modified and supplemented with some possible details.

## Getting started

```bash
# npm
$ npm install -D @funish/githooks

# yarn
$ yarn add -D @funish/githooks

# pnpm
$ pnpm add -D @funish/githooks
```

## Usage

### Example

```bash
# Install Git hooks during the post-installation phase of the lifecycle.
# Or you can use `pnpm githooks install -S prepare`.
$ pnpm githooks install -S

# Initialize Git hooks
$ pnpm githooks init pre-commit [pnpm lint-staged]

# Add a script to an existing git hook.
$ pnpm githooks add pre-commit <script>

# Uninstall Git hooks.
$ pnpm githooks uninstall
```

### CLI

```bash
$ githooks -h
githooks/0.0.0

Usage:
  $ githooks <command> [options]

Commands:
  install [dir]          Install Git hooks.
  init <hooks> [script]  Initialize Git hooks, you can see more details at https://git-scm.com/docs/githooks.
  add <hooks> <script>   Add a script to an existing git hook.
  uninstall              Uninstall Git hooks.
  migrate                Migrating from husky to @funish/githooks.

For more info, run any command with the `--help` flag:
  $ githooks install --help
  $ githooks init --help
  $ githooks add --help
  $ githooks uninstall --help
  $ githooks migrate --help

Options:
  -h, --help     Display this message
  -v, --version  Display version number
```

## Credits

- [Demo Macro](https://github.com/DemoMacro) - Always believe that good things are about to happen.

## License

- Code - [MIT](LICENSE) &copy; [Funish](https://funish.net/)
- Documentation - [CC-BY-NC-SA-4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) &copy; [Funish](https://funish.net/)
