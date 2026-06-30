type GitHubFileResponse = {
  content: string;
  sha: string;
  encoding: "base64";
};

function getGitHubConfig() {
  const token = process.env.GITHUB_TOKEN?.trim();
  const repo = process.env.GITHUB_REPO?.trim();
  const branch = process.env.GITHUB_BRANCH?.trim() || "main";

  if (!token || !repo) {
    throw new Error("GITHUB_TOKEN and GITHUB_REPO must be set for GitHub persistence.");
  }

  return { token, repo, branch };
}

async function githubRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const { token } = getGitHubConfig();
  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.headers || {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API ${response.status}: ${body}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function isGitHubPersistenceEnabled(): boolean {
  return Boolean(process.env.GITHUB_TOKEN?.trim() && process.env.GITHUB_REPO?.trim());
}

export async function readGitHubFile(path: string): Promise<{ content: string; sha?: string }> {
  const { repo, branch } = getGitHubConfig();
  const encodedPath = path
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");

  try {
    const data = await githubRequest<GitHubFileResponse>(
      `/repos/${repo}/contents/${encodedPath}?ref=${encodeURIComponent(branch)}`,
    );
    const content = Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf8");
    return { content, sha: data.sha };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("404")) {
      return { content: "" };
    }
    throw error;
  }
}

export async function writeGitHubFile(
  path: string,
  content: string | Uint8Array,
  message: string,
  sha?: string,
): Promise<void> {
  const { repo, branch } = getGitHubConfig();
  const encodedPath = path
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");

  const body =
    typeof content === "string"
      ? Buffer.from(content, "utf8").toString("base64")
      : Buffer.from(content).toString("base64");

  await githubRequest(`/repos/${repo}/contents/${encodedPath}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: body,
      branch,
      ...(sha ? { sha } : {}),
    }),
  });
}

export async function triggerDeployHook(): Promise<void> {
  const hook = process.env.VERCEL_DEPLOY_HOOK_URL?.trim();
  if (!hook) return;

  const response = await fetch(hook, { method: "POST" });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Deploy hook failed (${response.status}): ${body}`);
  }
}
