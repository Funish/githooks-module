import pkgJson from "@npmcli/package-json";
import { cwd } from "process";

export async function saveScript(name: string, script: string, path?: string) {
  const pkg = await pkgJson.load(path ? path : cwd());

  const { scripts } = pkg.content;

  pkg.update({
    scripts: {
      ...scripts,
      [name]: script,
    },
  });

  await pkg.save();
}
