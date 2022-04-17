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
# Install Git hooks.
$ yarn hooks install

# Initialize Git hooks
$ yarn hooks init pre-commit [yarn lint]

# Add a script to an existing git hook.
$ yarn hooks add pre-commit [yarn test]

# Uninstall Git hooks.
$ yarn hooks uninstall
```

### Recommend

Edit your `package.json` file and add the following script.

```json
{
  "scripts": {
    "postinstall": "hooks install"
  }
}
```

### CLI

```bash
$ hooks -h
hooks/0.0.0

Usage:
  $ hooks <command> [options]

Commands:
  install [dir]          Install Git hooks.
  init <hooks> [script]  Initialize Git hooks, you can see more details at https://git-scm.com/docs/githooks.
  add <hooks> <script>   Add a script to an existing git hook.
  uninstall              Uninstall Git hooks.

For more info, run any command with the `--help` flag:
  $ hooks install --help
  $ hooks init --help
  $ hooks add --help
  $ hooks uninstall --help

Options:
  -h, --help     Display this message
  -v, --version  Display version number
```

## Credits

- [Demo Macro](https://github.com/DemoMacro) - Always believe that good things are about to happen.

## License

- Code - [MIT](LICENSE) &copy; [Funish](https://funish.net/)
- Documentation - [CC-BY-NC-SA-4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) &copy; [Funish](https://funish.net/)
