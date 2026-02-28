# smyeong123.github.io

Personal blog built with [Hugo](https://gohugo.io/) and the `minimal-blog` theme.

## Prerequisites

- [Hugo](https://gohugo.io/installation/) (extended edition)

```bash
# macOS
brew install hugo
```

## Running locally

```bash
# Clone with submodules (theme)
git clone --recurse-submodules https://github.com/smyeong123/smyeong123.github.io.git
cd smyeong123.github.io

# Start the dev server
hugo server -D
```

The site will be available at `http://localhost:1313/`. The `-D` flag includes draft posts. Posts with `hide: true` are also visible locally but hidden in production builds.

## Creating a new post

1. Generate a new post:

```bash
hugo new content posts/my-new-post/index.md
```

2. This creates `content/posts/my-new-post/index.md` with the following frontmatter:

```yaml
---
title: "My New Post"
date: 2025-03-10T12:00:00+00:00
draft: false
description: ""
tags: []
hide: false
---
```

3. Edit the frontmatter:
   - `title` — post title (e.g. `"[KR] My Post"`)
   - `date` — publish date
   - `draft` — set to `true` to hide from production builds (still visible with `hugo server -D`)
   - `description` — short summary
   - `tags` — list of tags (e.g. `["PS", "DP"]`)
   - `hide` — set to `true` to hide from all listings (home page, tag pages) while keeping the post accessible via direct URL

4. Write your content in Markdown below the frontmatter.

5. To embed a PDF, use the `pdf` shortcode:

```markdown
{{</* pdf src="/pdf/my-file.pdf" */>}}
```

Place the PDF file in `static/pdf/`.

## Storing images and PDFs

Hugo uses [page bundles](https://gohugo.io/content-management/page-bundles/), so where you put files depends on how they're used:

| File type | Where to store | How to reference |
|-----------|---------------|-----------------|
| Post-specific images | `content/posts/my-post/` (same folder as `index.md`) | `![alt](image.png)` |
| Post-specific PDFs | `content/posts/my-post/` | `{{</* pdf src="my-file.pdf" */>}}` |
| Shared / global images | `static/images/` | `![alt](/images/image.png)` |
| Shared / global PDFs | `static/pdf/` | `{{</* pdf src="/pdf/my-file.pdf" */>}}` |

Prefer keeping files inside the post's own folder (`content/posts/my-post/`) so each post is self-contained. Use `static/` only for assets shared across multiple posts (e.g. site logo, reusable diagrams).

## Creating a photo album

The archive section at `/photos/` displays photo albums grouped by trip or event.

1. Create a new album folder:

```bash
mkdir content/photos/my-trip
```

2. Add an `index.md` with the following frontmatter:

```yaml
---
title: "My Trip"
date: 2026-01-15
location: "Tokyo, Japan"
description: "A short description of the album."
cover: "cover.*"
---
```

3. Frontmatter fields:
   - `title` — album name
   - `date` — date of the trip/event
   - `location` — location shown on the album card
   - `description` — optional description shown on the album page
   - `cover` — glob pattern for the cover image (defaults to `cover.*`)

4. Drop your photos (`.jpg`, `.png`, `.webp`) into the album folder. Name one `cover.jpg` (or `.png`/`.webp`) to use it as the album card thumbnail.

5. Photos are displayed in a masonry grid with a click-to-expand lightbox (supports arrow key navigation).

## LaTeX

Use `$...$` for inline math and `$$...$$` (on its own line) for block equations.

## Building for production

```bash
hugo
```

Output is generated in the `public/` directory.
