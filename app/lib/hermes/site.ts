import siteData from "@/app/content/site.json";
import {
  isGitHubPersistenceEnabled,
  readGitHubFile,
  triggerDeployHook,
  writeGitHubFile,
} from "./github";
import type { DeployHookResult } from "./github";
import { readLocalFile, writeLocalFile } from "./local";

export type SiteConfig = {
  avatar: string;
};

const SITE_FILE = "app/content/site.json";
const bundledSite = siteData as SiteConfig;

async function readSiteConfig(): Promise<{ config: SiteConfig; sha?: string }> {
  if (isGitHubPersistenceEnabled()) {
    const { content, sha } = await readGitHubFile(SITE_FILE);
    if (!content) {
      return { config: bundledSite, sha };
    }
    return { config: JSON.parse(content) as SiteConfig, sha };
  }

  try {
    const content = await readLocalFile(SITE_FILE);
    return { config: JSON.parse(content) as SiteConfig };
  } catch {
    return { config: bundledSite };
  }
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const { config } = await readSiteConfig();
  return config;
}

export async function updateSiteAvatar(
  avatarPath: string,
  commitMessage?: string,
): Promise<{ config: SiteConfig; deploy: DeployHookResult }> {
  const { config, sha } = await readSiteConfig();
  const next = { ...config, avatar: avatarPath };
  const payload = `${JSON.stringify(next, null, 2)}\n`;
  const message = commitMessage || "chore(hermes): update profile avatar path";

  if (isGitHubPersistenceEnabled()) {
    await writeGitHubFile(SITE_FILE, payload, message, sha);
    const deploy = await triggerDeployHook();
    return { config: next, deploy };
  }

  await writeLocalFile(SITE_FILE, payload);
  return { config: next, deploy: { triggered: false } };
}
