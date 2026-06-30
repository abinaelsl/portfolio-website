# Hermes ↔ Portfolio Website Integration

This site exposes a private CMS API so your **Hermes agent** can update projects, writing, research, and media without opening Content Studio.

## 1. Generate an API key

Create a long random secret, for example:

```bash
openssl rand -hex 32
```

## 2. Configure Vercel environment variables

In the Vercel project for `portfolio-website`, add:

| Variable | Required | Purpose |
|----------|----------|---------|
| `HERMES_API_KEY` | Yes | Secret Hermes sends on every request |
| `GITHUB_TOKEN` | Yes (production) | GitHub PAT with `repo` scope to commit content |
| `GITHUB_REPO` | Yes (production) | `abinaelsl/portfolio-website` |
| `GITHUB_BRANCH` | No | Defaults to `main` |
| `VERCEL_DEPLOY_HOOK_URL` | Optional | Full `https://...` deploy hook URL from Vercel → Settings → Git → Deploy Hooks (not the instruction text) |

### GitHub token

1. GitHub → Settings → Developer settings → Personal access tokens
2. Create a fine-grained or classic token with **Contents: Read and write** on `portfolio-website`
3. Paste it into `GITHUB_TOKEN`

### Deploy hook (optional but recommended)

1. Vercel project → Settings → Git → Deploy Hooks
2. Create a hook for `main`
3. Paste the URL into `VERCEL_DEPLOY_HOOK_URL`

After env vars are saved, redeploy the site once.

## 3. Give Hermes the key

In your Hermes agent config (YAML tools or env), set:

```yaml
PORTFOLIO_SITE_URL: https://abinael.xyz
PORTFOLIO_API_KEY: <your-HERMES_API_KEY>
```

Every request must include either:

- `Authorization: Bearer <PORTFOLIO_API_KEY>`
- `x-api-key: <PORTFOLIO_API_KEY>`

## 4. Discovery endpoint

```http
GET /api/hermes
Authorization: Bearer <key>
```

Returns the full schema, allowed media directories, and endpoint list. Call this once when wiring Hermes tools.

## 5. Common workflows

### Update project text

```http
PATCH /api/hermes/content/projects/offline-personal-assistant
Content-Type: application/json
Authorization: Bearer <key>

{
  "patch": {
    "tagline": "Hermes Agent running locally with qwen3.5:9b.",
    "overview": "Updated overview text..."
  }
}
```

### Upload a profile photo

```http
POST /api/hermes/media
Content-Type: application/json
Authorization: Bearer <key>

{
  "directory": "profile",
  "filename": "me.jpg",
  "mimeType": "image/jpeg",
  "contentBase64": "<base64>"
}
```

This overwrites `public/avatar.jpg` (or `.png` / `.webp` depending on mime type) and updates `app/content/site.json` so the home page hero photo changes after redeploy.

### Upload a project cover image

Send a photo Hermes received from you and attach it to the Hermes project entry:

```http
POST /api/hermes/media
Content-Type: application/json
Authorization: Bearer <key>

{
  "directory": "projects",
  "filename": "hermes-cover.png",
  "mimeType": "image/png",
  "contentBase64": "<base64>",
  "attach": {
    "contentType": "projects",
    "id": "offline-personal-assistant"
  }
}
```

The image is saved to `public/projects/` and the project `image` field is set automatically.

### Embed a photo in a writing post

```json
{
  "directory": "writing",
  "filename": "fintrack-screenshot.png",
  "mimeType": "image/png",
  "contentBase64": "<base64>",
  "attach": {
    "contentType": "posts",
    "id": "local-llm-experiment",
    "markdownAlt": "FinTrack dashboard"
  }
}
```

### Add a research entry

```http
POST /api/hermes/content/research
Content-Type: application/json

{
  "item": {
    "title": "Paper title",
    "authors": "Abinael Sarungallo Lumempouw",
    "venue": "Conference · 2027",
    "href": "https://example.com/paper.pdf",
    "tags": ["Energy", "Buildings"]
  }
}
```

Research items are addressed by **index** (`0`, `1`, …) in URLs.

## 6. Media placeholders

| Content | Directory | Field to set |
|---------|-----------|--------------|
| Profile photo (hero) | `profile` | auto-updates `site.json` → `/avatar.jpg` etc. |
| Project cover | `projects` | `image` → `/projects/filename.png` |
| Writing inline image | `writing` | embed in `body` as `![alt](/writing/file.png)` |
| Hosted research PDF/image | `research` | `href` → `/research/file.pdf` |

Max upload size: **4 MB**.

## 7. Local development

Without `GITHUB_TOKEN`, the API writes directly to the repo filesystem (`app/content/` and `public/`). Useful for testing Hermes tools locally with `npm run dev`.

## 8. Hermes tool definitions

See `hermes-tools.yaml` in the repo root for ready-to-copy YAML tool specs.

## Security notes

- Never put `HERMES_API_KEY` in client-side code or `NEXT_PUBLIC_*` env vars.
- Rotate the key if it leaks.
- The API only mutates content files under `app/content/` and media under `public/projects|writing|research|profile` (avatar).
