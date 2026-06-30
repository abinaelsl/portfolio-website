import { promises as fs } from "node:fs";
import path from "node:path";

export async function readLocalFile(filePath: string): Promise<string> {
  return fs.readFile(path.join(process.cwd(), filePath), "utf8");
}

export async function writeLocalFile(filePath: string, content: string | Uint8Array): Promise<void> {
  const absolute = path.join(process.cwd(), filePath);
  await fs.mkdir(path.dirname(absolute), { recursive: true });
  await fs.writeFile(absolute, content);
}
