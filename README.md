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

The site will be available at `http://localhost:1313/`. The `-D` flag includes draft posts.

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

## Building for production

```bash
hugo
```

Output is generated in the `public/` directory.
