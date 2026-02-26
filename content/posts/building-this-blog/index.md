---
title: "Building This Blog from Scratch with Hugo"
date: 2026-02-25T00:00:00+00:00
draft: false
description: "A walkthrough of how I built this personal blog — custom Hugo theme, dark mode, tag system, code copy buttons, PDF embeds, CI/CD, and more."
tags: ["CS", "Hugo"]
hide: false
---

## Why Hugo?

I wanted a blog that was fast, had zero JavaScript frameworks, and let me write posts in Markdown. Hugo checks all the boxes — it compiles an entire site in milliseconds and the output is plain HTML/CSS that loads instantly.

## Directory Structure

Here is the full project layout:

```
smyeong123.github.io/
├── archetypes/
│   └── default.md              # Template for new posts
├── content/
│   └── posts/
│       ├── _index.md            # Section title ("Articles")
│       └── my-post/
│           └── index.md         # Each post is a page bundle
├── layouts/
│   ├── index.html               # Home page override
│   ├── _default/
│   │   ├── list.html            # Post listing override
│   │   ├── taxonomy.html        # Individual tag page (/tags/cs/)
│   │   └── terms.html           # All tags page (/tags/)
│   ├── partials/
│   │   ├── head.html            # <head> override (adds tags.css)
│   │   ├── header.html          # Nav override (adds Tags link)
│   │   └── article-meta.html    # Post meta with inline tags
│   └── shortcodes/
│       └── pdf.html             # PDF embed shortcode
├── static/
│   └── css/
│       └── tags.css             # Tag styling (cloud + inline)
├── themes/
│   └── minimal-blog/            # Custom base theme
│       ├── layouts/
│       │   ├── _default/
│       │   │   ├── baseof.html  # Base HTML skeleton
│       │   │   ├── list.html    # Default list template
│       │   │   └── single.html  # Single post template
│       │   ├── index.html       # Default home page
│       │   └── partials/
│       │       ├── head.html
│       │       ├── header.html
│       │       ├── footer.html
│       │       └── article-meta.html
│       └── static/css/
│           └── style.css        # All base styling
├── .github/workflows/
│   └── deploy.yml               # GitHub Pages CI/CD
├── hugo.toml                    # Site configuration
└── .gitignore
```

Hugo's lookup order means files in `layouts/` override the same files in `themes/minimal-blog/layouts/`. This is the core pattern — the theme provides defaults, and the root `layouts/` folder customizes them without touching the theme.

## The Base Theme

### `baseof.html` — The Skeleton

Every page renders through this template:

```html
<!DOCTYPE html>
<html lang="en-us" data-theme="light">
<head>
  {{ partial "head.html" . }}
</head>
<body>
  {{ partial "header.html" . }}
  <main class="container">
    {{ block "main" . }}{{ end }}
  </main>
  {{ partial "footer.html" . }}
  <script>
    // Theme toggle + code copy button logic
  </script>
</body>
</html>
```

The `{{ block "main" . }}` is the slot that each page template fills in with `{{ define "main" }}`.

### Dark Mode

The theming system uses CSS custom properties with `[data-theme]` selectors:

```css
[data-theme="light"] {
  --bg: #ffffff;
  --text: #1a1a2e;
  --accent: #2563eb;
  --border: #e5e7eb;
  /* ... */
}

[data-theme="dark"] {
  --bg: #0f172a;
  --text: #e2e8f0;
  --accent: #60a5fa;
  --border: #334155;
  /* ... */
}
```

The toggle button flips `data-theme` on `<html>` and saves the choice to `localStorage`. On page load, a small inline script reads it back before the page renders, preventing any flash of wrong theme.

### Code Blocks with Copy Button

The `baseof.html` script wraps every `.highlight` block in a wrapper div and injects a copy button:

```js
document.querySelectorAll('.highlight').forEach(function(block) {
  var wrapper = document.createElement('div');
  wrapper.className = 'code-block-wrapper';
  block.parentNode.insertBefore(wrapper, block);
  wrapper.appendChild(block);

  var button = document.createElement('button');
  button.className = 'copy-btn';
  button.textContent = 'Copy';
  wrapper.appendChild(button);

  button.addEventListener('click', function() {
    navigator.clipboard.writeText(block.querySelector('code').textContent)
      .then(function() {
        button.textContent = 'Copied!';
        button.classList.add('copied');
        setTimeout(function() {
          button.textContent = 'Copy';
          button.classList.remove('copied');
        }, 2000);
      });
  });
});
```

The button is invisible by default (`opacity: 0`) and fades in on hover via CSS. The `.copied` class turns it green.

## CSS Design Approach

All styling lives in two files:

1. **`themes/minimal-blog/static/css/style.css`** — Base styles (layout, typography, header, post list, code blocks, syntax highlighting)
2. **`static/css/tags.css`** — Tag-specific styles (inline tags, tag cloud, tag detail pages)

Key design decisions:

- **Max-width 720px** container for comfortable reading
- **Sticky header** with backdrop blur for context while scrolling
- **System font stack** (`-apple-system, BlinkMacSystemFont, ...`) — no web font loading delay
- **Transition everything** — colors, backgrounds, borders all animate on theme switch and hover
- **Syntax highlighting** uses hand-picked colors for both themes rather than relying on Hugo's built-in Chroma CSS classes

## Layout Overrides

### Home Page (`layouts/index.html`)

Overrides the theme's home page to filter out hidden posts:

```go-html-template
{{ range where (where .Site.RegularPages "Section" "posts") ".Params.hide" "ne" true }}
  <!-- render post summary -->
{{ end }}
```

### Post Listing (`layouts/_default/list.html`)

Same filter applied to the `/posts/` page:

```go-html-template
{{ range where .Pages.ByDate.Reverse ".Params.hide" "ne" true }}
```

### Tags Page (`layouts/_default/terms.html`)

The `/tags/` page renders all tags as a cloud of pill-shaped links with post counts:

```go-html-template
<section class="tags-page">
  <h1 class="page-title">{{ .Title }}</h1>
  <p class="tags-subtitle">{{ len .Pages }} topics across all posts</p>
  <div class="tag-cloud">
    {{ range .Pages.ByTitle }}
    <a href="{{ .RelPermalink }}" class="tag-cloud-item">
      {{ .Title }} <span class="tag-count">{{ .Pages.Len }}</span>
    </a>
    {{ end }}
  </div>
</section>
```

Tags are styled as rounded pills with an accent-tinted count badge. On hover they lift up with a colored shadow.

### Tag Detail Page (`layouts/_default/taxonomy.html`)

When you click a tag, you see all posts for that tag with a styled header and a back link:

```go-html-template
<div class="tag-detail-header">
  <div class="tag-label"># {{ .Title }}</div>
  <p class="post-count">{{ len .Pages }} posts</p>
</div>
{{ range where .Pages.ByDate.Reverse ".Params.hide" "ne" true }}
  <!-- render post summaries -->
{{ end }}
<a href="/tags/" class="tag-back-link">← All tags</a>
```

### Inline Tags on Posts (`layouts/partials/article-meta.html`)

Each post shows its tags inline next to the date:

```go-html-template
<div class="article-meta">
  <time datetime="{{ .Date.Format "2006-01-02" }}">
    {{ .Date.Format "January 2, 2006" }}
  </time>
  {{ with .ReadingTime }}
    <span class="reading-time">· {{ . }} min read</span>
  {{ end }}
  {{ with .Params.tags }}
  <span class="tag-list">
    {{ range . }}
      <a href="/tags/{{ . | urlize }}/" class="tag">{{ . }}</a>
    {{ end }}
  </span>
  {{ end }}
</div>
```

## The `hide` Feature

Posts with `hide: true` in frontmatter are excluded from all listings but remain accessible via direct URL. This is useful for draft-like posts you want to share privately — unlike Hugo's built-in `draft` which removes the page entirely from production builds.

The filter is a Hugo `where` clause applied in every template that lists posts:

```go-html-template
{{ range where .Pages.ByDate.Reverse ".Params.hide" "ne" true }}
```

## PDF Shortcode

A one-liner shortcode at `layouts/shortcodes/pdf.html`:

```html
<iframe src="{{ .Get "src" }}" width="100%" height="800px"
        style="border: none;"></iframe>
```

Usage in any post:

```markdown
{{</* pdf src="my-file.pdf" */>}}
```

## Post Archetype

The `archetypes/default.md` file is the template for `hugo new`:

```yaml
---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
draft: false
description: ""
tags: []
hide: false
---
```

Running `hugo new content posts/my-post/index.md` scaffolds a new page bundle with this frontmatter.

## Hugo Configuration

```toml
baseURL = "https://smyeong123.github.io/"
languageCode = "en-us"
title = "smyeong123"
theme = "minimal-blog"

[markup.highlight]
  codeFences = true
  noClasses = false

[markup.goldmark.renderer]
  unsafe = true

[permalinks]
  posts = "/posts/:slug/"
```

Notable settings:

- **`noClasses = false`** — Uses CSS classes for syntax highlighting instead of inline styles, so the theme can control colors
- **`unsafe = true`** — Allows raw HTML in Markdown (needed for embeds)
- **`permalinks`** — Clean URLs like `/posts/my-post/` instead of date-based paths

## CI/CD with GitHub Actions

The `.github/workflows/deploy.yml` handles automatic deployment:

1. **Trigger**: Push to `main`, daily schedule, or manual dispatch
2. **Build**: Installs Hugo extended, runs `hugo build --gc --minify`
3. **Deploy**: Uploads the `public/` directory to GitHub Pages

```yaml
on:
  push:
    branches: [main]
  schedule:
    - cron: "0 8 * * *"
  workflow_dispatch:
```

The daily schedule ensures time-sensitive content (like posts with future dates) gets published on time.

## Page Bundles

Every post is a folder (page bundle) rather than a standalone `.md` file:

```
content/posts/my-post/
├── index.md       # The post content
├── diagram.png    # Images referenced as ![](diagram.png)
└── notes.pdf      # PDFs referenced in shortcodes
```

This keeps each post self-contained — images, PDFs, and other assets live alongside the content instead of in a shared `static/` folder.

## Summary

The entire blog is ~20 files of actual source code. No build tools beyond Hugo itself, no npm, no JavaScript frameworks. The theme override system means customizations are cleanly separated from the base theme, and adding new features (like the tag redesign or `hide` parameter) is just a matter of adding or overriding a template file.
