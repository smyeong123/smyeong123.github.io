---
name: new-post
description: Create a new Hugo blog post as a leaf bundle
disable-model-invocation: true
argument-hint: "[post-slug]"
allowed-tools: Bash, Read, Edit, Write
---

Create a new blog post for the Hugo site:

1. Run `hugo new posts/$ARGUMENTS/index.md` to scaffold the post as a leaf bundle
2. Read the generated file at `content/posts/$ARGUMENTS/index.md`
3. Ask the user what the post should be about
4. Fill in the front matter:
   - `title`: A descriptive title based on the slug or user input
   - `date`: Keep the auto-generated date
   - `draft: false`
   - `description`: A one-sentence summary for the article list
   - `tags`: Relevant tags as a list
5. If the user provides markdown content or a topic, write the post body
6. Remind the user they can add images by placing files in `content/posts/$ARGUMENTS/` and referencing them with `![alt](filename.jpg)` in the markdown
7. Remind the user they can add downloadable attachments by placing files in `content/posts/$ARGUMENTS/attachments/`
