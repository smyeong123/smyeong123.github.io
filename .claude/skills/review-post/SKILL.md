---
name: review-post
description: Review and proofread a blog post draft
disable-model-invocation: true
argument-hint: "[post-slug]"
allowed-tools: Read, Edit
---

Review the blog post at `content/posts/$ARGUMENTS/index.md`:

1. Read the full post file
2. Provide feedback in these categories:

   **Grammar & Spelling**: Fix typos, grammatical errors, and awkward phrasing.

   **Clarity**: Flag sentences that are unclear or overly complex. Suggest simpler alternatives.

   **Structure**: Check that the post flows logically — introduction, body, conclusion. Suggest reordering or adding section headers if needed.

   **Code Blocks**: Verify code examples have correct syntax highlighting language tags. Check that code is syntactically valid.

   **Front Matter**: Ensure `title`, `date`, `description`, and `tags` are all filled in. Flag if `draft` is set to `true`.

   **Tone**: Keep the tone consistent — conversational but professional.

3. Present the findings as a bulleted list grouped by category
4. Ask the user if they want you to apply the suggested fixes automatically
