# Handoff — Portfolio Website

## Overview
Personal portfolio untuk Abinael Sarungallo Lumempouw. Nge-showcase projects, writing, dan research (Net Zero Buildings).

## Stack
- Next.js 16 (App Router) · TypeScript · Tailwind v4
- Motion (Framer) · next-themes · react-markdown
- Vercel (deployment)

## Structure
```
portfolio-website/
├── app/
│   ├── page.tsx            # Home
│   ├── writing/            # Writing index + detail
│   ├── projects/           # Project detail pages
│   ├── components/         # Nav, footer, orbital, theme toggle, etc.
│   └── content/
│       ├── projects.json   # 4 projects (StatusMaxx, Sarungallo, FinTrack, Hermes)
│       ├── posts.json      # Writing entries
│       └── research.json   # 1 publikasi (Net Zero House)
└── lib/                    # Data utilities + motion variants
```

## Content
4 projects + 1 research paper. All content is static JSON — no CMS.

## Known Issues (dari Cursor AI scan)
- ✅ **Bersih** — no critical bugs or security issues
- ℹ️ External URLs from JSON content langsung di-render (aman selama static)

## Status Local vs Cloud
✅ Branch: `main` — up to date
✅ No uncommitted changes